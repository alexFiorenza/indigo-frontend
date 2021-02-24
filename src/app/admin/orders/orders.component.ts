import { ConfirmationService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/utilities/interfaces/order';
import { OrdersService } from '../../core/services/http/api/orders/orders.service';
import { ShippingService } from '../../core/services/http/andreani/shipping.service';
import swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  pendingOrders: Order[] = [];
  history: Order[] = [];
  states = ['Completado', 'En camino', , 'Pausado']
  uploadsUrl = environment.uploadsUrl;
  ordersUnread: Order[] = [];
  creditCardThumbnail: string;
  showInfoProduct = false;
  currentOrder: Order;
  seeMoreInfoPaymentData = false;
  pdfFile;
  loadingOrderAndreani = false;
  showAndreaniOrderState = false;
  constructor(private ordersService: OrdersService,
    private andreaniService: ShippingService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((res: any) => {
      //TODO Create order when status is active
      //? May accept orders or create order in andreani automatically
      this.pendingOrders = res.response.filter((e) => e.status !== 'Completado')
      this.ordersUnread = this.pendingOrders.filter((e) => e.status === 'Pendiente');
      this.ordersService.getOrders(true).subscribe((res: any) => {
        this.history = res.response;
      })
    })
  }
  updateOrderStatus(order: Order, status: string) {
    if (status === 'Activo') {
      this.confirmationService.confirm({
        message: 'Al momento de aceptar el pedido, se creara la orden y no podras cancelarla',
        header: "Confirmación",
        acceptLabel: 'Si',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (order.deliveryMethod === 'andreani') {
            //Actual logic to perform a confirmation
            this.loadingOrderAndreani = true;
            const origin = {
              postal: {
                codigoPostal: order.branch_office.cp.toString(),
                calle: order.branch_office.calle,
                numero: order.branch_office.numero,
                localidad: order.branch_office.localidad,
                pais: "Argentina"
              }
            }
            //TODO Integrate flat destination
            const destination = {
              postal: {
                codigoPostal: order.user.cp.toString(),
                calle: order.user.street,
                numero: order.user.numberStreet,
                localidad: order.user.town,
                pais: "Argentina"
              }
            }
            const receiver = [{
              nombreCompleto: order.user.name,
              email: order.user.email,
              documentoTipo: order.user.docType,
              documentoNumero: order.user.docNumber.toString(),
              telefonos: [
                {
                  tipo: 1,
                  numero: order.user.phone.toString()
                }
              ]
            }]
            if (order.user.department) {
              Object.assign(destination.postal, {
                componentesDeDireccion: [{
                  meta: "piso",
                  contenido: order.user.floor
                },
                {
                  meta: "departamento",
                  contenido: order.user.department
                }]
              })
            }
            var packages = [];
            for (const product of order.products) {
              let tmpProduct = {
                kilos: product.packageWeight.weight,
                largoCm: product.packageWeight.length,
                anchoCm: product.packageWeight.width,
                altoCm: product.packageWeight.height,
                volumenCm: product.packageWeight.volume
              }
              packages.push(tmpProduct);
            }
            this.andreaniService.createOrder(origin, destination, receiver, packages).subscribe((res: any) => {

              if (res.status) {
                let trackingDeliveryData = [];
                res.response.bultos.forEach(element => {
                  trackingDeliveryData.push(element);
                });
                this.ordersService.updateOrder(order._id, { trackingDeliveryData, status: 'Activo' }).subscribe((response: any) => {
                  if (response.status) {
                    swal.fire({
                      title: 'Confirmado',
                      text: 'La orden a andreani se ha generado correctamente',
                      icon: 'success',
                    }).then((res) => {
                      if (res.isDismissed || res.isConfirmed) {
                        window.location.reload();
                      }
                    })
                  }
                })
              }
            })
          } else {
            this.ordersService.updateOrder(order._id, status).subscribe((res: any) => {
              if (res.status) {
                window.location.reload();
              } else {
                console.error('An error has occured')
              }
            })
          }
        },
        reject: () => {

        }
      });

    } else {
      this.ordersService.updateOrder(order._id, status).subscribe((res: any) => {
        if (res.status) {
          window.location.reload();
        } else {
          console.error('An error has occured')
        }
      })
    }
    //sweet alert
  }
  seeMoreInfoProduct(order: Order) {
    this.currentOrder = order;
    switch (this.currentOrder.paymentData.payment_method) {
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
    this.showInfoProduct = !this.showInfoProduct;
  }
  getCurrentOrderState(id: string) {
    this.andreaniService.getPdfOrderState(id).subscribe((value: any) => {
      if (value.status) {
        let link = document.createElement('a');
        link.href = `${environment.uploadsUrl}/${id}.pdf`;
        link.target = '__blank';
        link.click();
      }
    })
  }
}

