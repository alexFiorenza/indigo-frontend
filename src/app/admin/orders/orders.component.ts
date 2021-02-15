import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/utilities/interfaces/order';
import { OrdersService } from '../../core/services/http/api/orders/orders.service';
import swal from 'sweetalert2'
import { ShippingService } from '../../core/services/http/andreani/shipping.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  pendingOrders: Order[] = [];
  history: Order[] = [];
  states = ['Completado', 'En camino', , 'Pausado', 'Activo']
  uploadsUrl = environment.uploadsUrl;
  ordersUnread: Order[] = [];
  creditCardThumbnail: string;
  showInfoProduct = false;
  currentOrder: Order;
  constructor(private ordersService: OrdersService, private andreaniService: ShippingService) { }
  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((res: any) => {
      //TODO Create order when status is active
      //? May accept orders or create order in andreani automaticall
      this.pendingOrders = res.response.filter((e) => e.status !== 'Completado')
      this.ordersUnread = this.pendingOrders.filter((e) => e.status === 'Pendiente');
      this.ordersService.getOrders(true).subscribe((res: any) => {
        this.history = res.response;
      })
    })
  }
  updateOrderStatus(order: Order, status: string) {
    if (order.status === 'Pendiente' && status === 'Activo') {
      //TODO Create order
      // this.andreaniService.createOrder().subscribe((res) => {

      // })
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
    switch (this.currentOrder.paymentMethod.payment_method) {
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
    console.log(this.creditCardThumbnail);
    this.showInfoProduct = !this.showInfoProduct;
  }
}
