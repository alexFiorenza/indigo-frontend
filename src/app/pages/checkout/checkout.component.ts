import { OrdersService } from './../../core/services/http/api/orders/orders.service';
import { CartService } from './../../core/services/cart/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import swal from 'sweetalert2';
import { Component, OnInit, Renderer2, Input, Inject, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @Input() public transactionAmount: Number = 0;
  // public swal: SweetAlert = swal;
  public mp;
  public form: FormGroup;
  public paymentMethod;
  public issuers: Array<any> = [];
  public installments: Array<any> = [];
  public creditCardThumbnail;
  public identificationTypes;
  public token;
  @ViewChild('yearContainer') private yearsInput: ElementRef;
  @ViewChild('monthContainer') private monthInput: ElementRef;
  private mpPublickKey = 'TEST-670fd7e7-cb6d-4220-944e-95c0e38825cd';
  private mpScript = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';
  constructor(private r: Renderer2, @Inject(DOCUMENT) public document,
    private formBuilder: FormBuilder, private router: Router, private orderService: OrdersService, private cartService: CartService) {
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
    this.transactionAmount = this.router.getCurrentNavigation().extras.state.price
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
    this.mp.createToken(generateTokenObjs, async (status, response) => {
      if (status === 200 || status === 201) {
        this.token = response.id;
        const installments = this.form.get('installments').value;
        const paymentMethodId = this.form.get('paymentMethodId').value;
        const docNumber = this.form.get('docNumber').value;
        const docType = this.form.get('docType').value;
        //TODO Match with andreaniapi
        const paymentData = {
          products: this.cartService.getProducts(),
          date: Date.now(),
          delayTime: '1 week',
          delivery: 'andreani',
          token: this.token,
          docNumber,
          docType
        };
        this.orderService.processPayment(paymentData, installments, paymentMethodId, this.transactionAmount).subscribe(resp => {
          if (status) {
            swal.fire({
              title: 'Confirmado',
              text: 'El pago se ha procesado correctamente',
              icon: 'success',
            });
            setTimeout(() => {
              //TODO Redirect to order process
              this.router.navigate(['/panel/pedidos']);
            }, 2000);
          } else {
            swal.fire({
              title: '¡Ha ocurrido un error!',
              text: 'Los datos introducidos no son correctos',
              icon: 'error',
            });
            setTimeout(() => {
              //TODO Redirect to order process
              this.router.navigate(['profile']);
            }, 3000);
          }
        });
      } else {
        swal.fire({
          title: 'Ha ocurrido un error',
          text: 'Los datos no pudieron ser validados',
          icon: 'error',
        });
        setTimeout(() => {
          swal.close();
          this.router.navigate(['carrito']);
        }, 2500);
      }
    });
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
