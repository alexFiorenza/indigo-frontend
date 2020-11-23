import { Router } from '@angular/router';
import { RegisterComponent } from './../../../auth/register/register.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, Input, Inject, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @Input() public transactionAmount: Number = 1000;
  public mp;
  public form: FormGroup;
  public paymentMethod;
  public issuers: Array<any> = [];
  public installments: Array<any> = [];
  public creditCardThumbnail;
  public identificationTypes;
  @ViewChild('yearContainer') private yearsInput: ElementRef;
  @ViewChild('monthContainer') private monthInput: ElementRef;
  private mpPublickKey = 'TEST-670fd7e7-cb6d-4220-944e-95c0e38825cd';
  private mpScript = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';
  constructor(private r: Renderer2, @Inject(DOCUMENT) public document, private formBuilder: FormBuilder, private router: Router) {
    this.r.setStyle(document.body, 'background-color', ' #f3f3f3');
    this.form = this.formBuilder.group({
      creditCardNumber: ['', Validators.required],
      expireDateMM: ['', Validators.required],
      expireDateYY: ['', Validators.required],
      cardholderName: ['', Validators.required],
      securityCode: ['', Validators.required],
      docType: ['', Validators.required],
      docNumber: ['', Validators.required],
      paymentMethodId: ['', Validators.required],
      selectedIssuer: ['', Validators.required],
      installments: ['', Validators.required]
    });
    //TODO Change it when form finally implemented
    // this.transactionAmount = this.router.getCurrentNavigation().extras.state.price

  }
  generateToken(form) {

    const generateTokenObjs = {
      cardNumber: this.form.get('creditCardNumber').value,
      cardExpirationMonth: this.form.get('expireDateMM').value,
      cardExpirationYear: this.form.get('expireDateYY').value,
      securityCode: this.form.get('securityCode').value,
      cardholderName: this.form.get('cardholderName').value,
      docType: this.form.get('docType').value,
      docNumber: this.form.get('docNumber').value,
      issuer: this.form.get('selectedIssuer').value
    };
    this.mp.createToken(generateTokenObjs, (status, response) => {
      if (status === 200) {

      } else {

        console.log(`Response failed, reason: ${response}`);
      }
    })
  }
  backendResponseMp() {

  }
  ngOnInit(): void {
    this.generateScript();
    this.getIdentificationTypes();

  }
  checkCreditCardNumber() {
    const value: number = this.form.get('creditCardNumber').value;
    if (value) {
      const cardnumber = value.toString();
      if (cardnumber.length >= 6) {
        const bin = cardnumber.substring(0, 6);
        // tslint:disable-next-line: no-shadowed-variable
        this.mpPaymentMethod(bin).then((value) => {
          this.paymentMethod = value.response;
          switch (this.paymentMethod.id) {
            case 'master':
              this.creditCardThumbnail = '../../../../assets/mastercard.svg';
              break;
            case 'amex':
              this.creditCardThumbnail = '../../../../assets/amex.svg';
              break;
            default:
              this.creditCardThumbnail = '../../../../assets/visa.svg';
              break;
          }
          this.setPaymentMethod();
        }).catch((err) => {
          this.form.get('creditCardNumber').setErrors({
            error: 'Credit card not identified'
          });
          console.log(err);
        });
      }
    }
  }
  mpPaymentMethod(bin): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mp.getPaymentMethod({ bin }, (status, response: Array<any>) => {
        if (status === 200) {
          const res = {
            status,
            response: response[0]
          };
          resolve(res);
        } else {
          reject(`payment method info error: ${response}`);
        }
      });
    });
  }
  setPaymentMethod() {
    this.form.get('paymentMethodId').setValue(this.paymentMethod.id);
    this.getIssuers(this.paymentMethod.id).then((value: any) => {
      this.issuers = value.response;
    }).catch(err => {
      this.form.get('creditCardNumber').setErrors({
        error: 'Issuers not found'
      });
      console.log(err);
    });
  }

  getIssuers(paymentMethodId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mp.getIssuers(
        paymentMethodId,
        (status, response) => {
          if (status === 200) {
            const res = {
              status,
              response
            };
            resolve(res);
          } else {
            reject(`issuers method info error: ${response}`);
          }
        }
      );
    });
  }
  getInstallments(value) {
    const issuerId = value;
    this.mp.getInstallments({
      payment_method_id: this.paymentMethod.id,
      amount: parseFloat(this.transactionAmount.toString()),
      // tslint:disable-next-line: radix
      issuer_id: parseInt(issuerId)
    }, (status, response) => {
      this.setInstallments(status, response);
    });
  }

  setInstallments(status, response) {
    if (status === 200) {
      // this.form.get('installments').setValue(this.defaultInstallments);
      this.installments = response[0].payer_costs;
    } else {
      console.log(`installments method info error: ${response}`);
    }
  }

  generateScript() {
    const script: HTMLScriptElement = this.r.createElement('script');
    script.type = 'text/javascript';
    script.src = this.mpScript;
    script.text = ``;
    this.r.appendChild(document.body, script);
    script.onload = async () => {
      this.mp = (window as any).Mercadopago;
      this.mp.setPublishableKey(this.mpPublickKey);
      this.getIdentificationTypes();
    };
  }

  typingDate(container: HTMLInputElement) {
    const inputValue = container.value;
    let parsedValue;
    if (!inputValue.includes('0') || inputValue.includes('-')) {
      parsedValue = parseInt(inputValue, 10);
    }
    const id = container.id;
    if (id === 'cardExpirationMonth' && (parsedValue > 12 || parsedValue <= 0)) {
      this.form.get('expireDateMM').setValue('');
    } else if (inputValue.length === 2) {
      this.yearsInput.nativeElement.focus();
    }
  }
  onFocusInput(container: HTMLInputElement) {
    if (this.form.get('expireDateMM').value === '') {
      this.monthInput.nativeElement.focus();
    }
  }
  onFormSubmit() {
    this.generateToken(this.form.value);
  }

  async getIdentificationTypes() {
    try {
      // tslint:disable-next-line: max-line-length
      const identifications = await (await fetch(`https://api.mercadopago.com/v1/identification_types?public_key=${this.mpPublickKey}`)).json();
      this.identificationTypes = identifications;
    } catch (error) {
      console.log(error);
    }
  }

}
