import { environment } from './../../../../environments/environment';
import { OrdersService } from './../../../core/services/http/api/orders/orders.service';
import { UserService } from './../../../core/services/http/api/user/user.service';
import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { User } from '../../../shared/utilities/interfaces/user';
import { Order } from '../../../shared/utilities/interfaces/order';
import { SwiperOptions } from 'swiper';
import { DOCUMENT } from '@angular/common';
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
  constructor(private orderService: OrdersService, private userService: UserService, @Inject(DOCUMENT) private document, private r: Renderer2) { }
  ngOnInit(): void {
    this.user = this.userService.loadPayload();
    this.r.setStyle(document.body, 'overflow-x', 'hidden');
    this.orderService.getOrdersPerUserId(this.user._id).subscribe((value: any) => {
      this.orders = value.response;
    });
  }
  openedOrder(orderInfo: HTMLElement, order: Order, orderContainer: HTMLElement, icon: HTMLElement) {
    const extraInfo = orderContainer.children[orderContainer.children.length - 1];
    if (extraInfo.classList.contains('hidden')) {
      icon.classList.remove('defaultRotationArrow');
      icon.classList.add('rotateArrow90');
      extraInfo.classList.toggle('hidden')
      extraInfo.classList.toggle('flex')
      orderInfo.classList.remove('animate__slideInDown')
    } else {
      extraInfo.classList.remove('animate__backInDown');
      extraInfo.classList.add('animate__slideOutUp');
      setTimeout(() => {
        icon.classList.remove('rotateArrow90');
        extraInfo.classList.toggle('hidden')
        extraInfo.classList.toggle('flex')
        extraInfo.classList.remove('animate__slideOutUp');
        extraInfo.classList.add('animate__backInDown')
      }, 200);
      icon.classList.add('defaultRotationArrow');
    }
    orderInfo.classList.toggle('animate__rubberBand');
  }
}
