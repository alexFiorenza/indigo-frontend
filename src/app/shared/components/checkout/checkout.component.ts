import { RegisterComponent } from './../../../auth/register/register.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, Input, Inject } from '@angular/core';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @Input() public transactionAmount: Number = 100;
  public mp;
  public form: FormGroup;
  public paymentMethod;
  public issuers: Array<any> = [];
  public defaultIssuer;
  public installments: Array<any> = [];
  public defaultInstallments;
  public creditCardThumbnail;
  private mpPublickKey = 'TEST-670fd7e7-cb6d-4220-944e-95c0e38825cd';
  private mpScript = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';
  constructor(private r: Renderer2, @Inject(DOCUMENT) public document, private formBuilder: FormBuilder) {
    this.r.setStyle(document.body, 'background-color', ' #f3f3f3');
    this.form = this.formBuilder.group({
      creditCardNumber: ['', Validators.required],
      expireDateMM: ['', Validators.required, Validators.maxLength(2)],
      expireDateYY: ['', Validators.required, Validators.maxLength(2)],
      cardholderName: ['', Validators.required],
      securityCode: ['', Validators.required],
      docType: [''],
      docNumber: [''],
      paymentMethodId: ['', Validators.required],
      selectedIssuer: ['', Validators.required],
      installments: ['', Validators.required]
    });
  }
  checkCreditCardNumber() {
    const value: number = this.form.get('creditCardNumber').value;
    if (value) {
      const cardnumber = value.toString();
      if (cardnumber.length >= 6) {
        const bin = cardnumber.substring(0, 6);
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
          console.log(this.paymentMethod);
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
    this.getIssuers(this.paymentMethod.id).then(value => {
      this.setIssuers(value.response);
    }).catch(err => {
      this.form.get('creditCardNumber').setErrors({
        error: 'Issuers not found'
      });
      console.log(err);
    });
  }
  ngOnInit(): void {
    this.generateScript();
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

  setIssuers(issuers) {
    this.issuers = issuers;
    this.defaultIssuer = this.issuers[0];
    this.form.get('selectedIssuer').setValue(this.defaultIssuer.id);
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
      console.log(response);
      this.installments = response[0].payer_costs;
      this.defaultInstallments = this.installments[0].recommended_message;
      this.form.get('installments').setValue(this.defaultInstallments);
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
    script.onload = () => {
      this.mp = (window as any).Mercadopago;
      this.mp.setPublishableKey(this.mpPublickKey);
      this.mp.getIdentificationTypes();
    };
  }
}
