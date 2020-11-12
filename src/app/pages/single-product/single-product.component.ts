import { CartService } from "./../../core/services/cart/cart.service";
import { DOCUMENT } from "@angular/common";
import { SwiperOptions } from "swiper";
import { environment } from "./../../../environments/environment";
import { ProductsService } from "./../../core/services/http/api/products/products.service";
import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Product } from "src/app/shared/utilities/interfaces/product";
import { map } from "rxjs/operators";

@Component({
  selector: "app-single-product",
  templateUrl: "./single-product.component.html",
  styleUrls: ["./single-product.component.scss"],
})
export class SingleProductComponent implements OnInit {
  public productId: string;
  public product: Product;
  public apiUrl: string;
  public production = environment.production;
  public selectedColor: string;
  public selectedSize: string;
  public config: SwiperOptions = {
    direction: "horizontal",
    slidesPerView: 1,
    autoplay: true,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    @Inject(DOCUMENT) private _document,
    private r: Renderer2,
    private cartService: CartService
  ) {
    this.r.setStyle(document.body, "background-color", " #f3f3f3");
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productService.getSingleProduct(params.id).subscribe((resp: any) => {
        this.product = resp.response;
        if (!this.production) {
          this.apiUrl = `${environment.uploadsUrl}/`;
        } else {
          //do staff with gcp service
        }
      });
    });
  }
  ngOnInit(): void {}
  addToCart(colorSelected, sizeSelected) {
    const productToAdd = { ...this.product };
    Object.assign(productToAdd, {
      color: colorSelected,
      sizes: sizeSelected,
    });
    this.cartService.addNewProduct(productToAdd);
  }
  selectColor(event) {
    const containerColor = event.currentTarget;
    containerColor.classList.add("selectedColor");
    const hex = this.getRGBValues(containerColor.style.backgroundColor);
    const red = hex[0];
    const green = hex[1];
    const blue = hex[2];
    this.selectedColor = this.rgbToHex(red, green, blue);
  }
  selectSize(event) {
    const containerSize = event.currentTarget;
    containerSize.classList.add("selectedSize");
    const size = containerSize.textContent;
    this.selectedSize = size;
  }
  rgbToHex(r, g, b) {
    // tslint:disable-next-line: no-bitwise
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  getRGBValues(str) {
    let sep = str.indexOf(",") > -1 ? "," : " ";
    console.log(sep);
    return str.substr(4).split(")")[0].split(sep).map(Number);
  }
}
