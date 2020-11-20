import { environment } from './../../../environments/environment';
import { ProductsService } from './../../core/services/http/api/products/products.service';
import { UserService } from './../../core/services/http/api/user/user.service';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Product } from 'src/app/shared/utilities/interfaces/product';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('filters') private filters: ElementRef;
  @ViewChild('icon') private icon: ElementRef;
  @ViewChild('filtersTexts') private filtersTexts: ElementRef;
  @ViewChild('filterTags') private tags: ElementRef;
  private opened = false;
  public products: Array<Product>;
  private totalPages: Number;
  public apiUrl: string;
  public production = environment.production;
  private currentFilters = [];
  constructor(
    @Inject(DOCUMENT) public document,
    private r: Renderer2,
    private productService: ProductsService
  ) {
    this.r.setStyle(document.body, 'background-color', ' #f3f3f3');
  }
  ngOnInit(): void {
    if (!this.production) {
      this.apiUrl = `${environment.uploadsUrl}/`;
    } else {
      // do staff with gcp service
    }
    this.productService.getProducts(1, 10).subscribe((resp) => {
      console.log('reached');
      this.products = resp.response.products;
      this.totalPages = resp.response.totalPages;
    });
  }
  toggleMenu() {
    if (!this.opened) {

      this.icon.nativeElement.classList.remove('defaultRotationArrow');
      this.opened = true;
      this.filters.nativeElement.classList.add('normalizeHeight');
      this.icon.nativeElement.classList.add('rotateArrow90');
      setTimeout(() => {
        this.filtersTexts.nativeElement.classList.remove('hidden');
        this.filtersTexts.nativeElement.classList.add('flex');

      }, 400);
    } else {
      this.filters.nativeElement.classList.remove('normalizeHeight');
      setTimeout(() => {
        this.icon.nativeElement.classList.remove('rotateArrow90');
        this.filtersTexts.nativeElement.classList.remove('flex');
        this.filtersTexts.nativeElement.classList.add('hidden');
      }, 400);
      this.filters.nativeElement.classList.add('h-24');
      this.icon.nativeElement.classList.add('defaultRotationArrow');

      this.opened = false;
    }
  }
  //TODO create filters product
  createTagFilter(text: HTMLElement) {
    const filterText = text.textContent;
    const index = this.currentFilters.indexOf(filterText);
    console.log(index);
    if (index > 0) {
      this.currentFilters.splice(index);
      console.log(this.currentFilters);
    } else {
      const tag = `<span
      class="px-4 py-2 font-Josefin text-white bg-indigoPink-600 rounded-full lg:text-xs lg:py-1"
      >${filterText}</span
    >`;
      this.tags.nativeElement += tag;
      this.currentFilters.push(filterText);
    }
  }
}
