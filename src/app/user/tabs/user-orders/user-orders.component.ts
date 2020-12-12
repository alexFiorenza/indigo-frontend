import { environment } from './../../../../environments/environment';
import { OrdersService } from './../../../core/services/http/api/orders/orders.service';
import { UserService } from './../../../core/services/http/api/user/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../../shared/utilities/interfaces/user';
import { Order } from '../../../shared/utilities/interfaces/order';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  private user: User;
  public orders: Order[];
  public uploadsUrl = environment.uploadsUrl;
  public sliderConfig: SwiperOptions = {
    direction: 'vertical',
    slidesPerView: 1,
    autoplay: {
      delay: 1000
    }
  }
  public opened = false;
  @ViewChild('icon') private icon: ElementRef;
  constructor(private orderService: OrdersService, private userService: UserService) { }
  ngOnInit(): void {
    this.user = this.userService.loadPayload();
    this.orderService.getOrdersPerUserId(this.user._id).subscribe((value: any) => {
      this.orders = value.response;
      console.log(this.orders);
    });
  }
  openedOrder(orderInfo: HTMLElement, order: Order, orderContainer: HTMLElement) {
    const extraInfo = orderContainer.children[orderContainer.children.length - 1];
    if (!this.opened) {
      this.icon.nativeElement.classList.remove('defaultRotationArrow');
      this.icon.nativeElement.classList.add('rotateArrow90');
      extraInfo.classList.toggle('hidden')
      extraInfo.classList.toggle('flex')
      orderInfo.classList.remove('animate__slideInDown')
      this.opened = true;
    } else {
      extraInfo.classList.remove('animate__backInDown');
      extraInfo.classList.add('animate__slideOutUp');
      setTimeout(() => {
        this.icon.nativeElement.classList.remove('rotateArrow90');
        extraInfo.classList.toggle('hidden')
        extraInfo.classList.toggle('flex')
        extraInfo.classList.remove('animate__slideOutUp');
        extraInfo.classList.add('animate__backInDown')
      }, 200);
      this.icon.nativeElement.classList.add('defaultRotationArrow');
      this.opened = false;
    }
    orderInfo.classList.toggle('animate__rubberBand');
  }
}
