import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/utilities/interfaces/order';
import { OrdersService } from '../../core/services/http/api/orders/orders.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  states = ['Completado', 'En camino', , 'Pausado']
  uploadsUrl = environment.uploadsUrl;
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((res: any) => {
      this.orders = res.response;
      console.log(this.orders);
    })
  }
  updateOrderStatus(id: string, status: string) {
    this.ordersService.updateOrder(id, status).subscribe((res: any) => {
      if (res.status) {
        window.location.reload();
      } else {
        console.error('An error has occured')
      }
    })
    //sweet alert
  }

}
