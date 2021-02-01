import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { ProductsService } from './../../core/services/http/api/products/products.service';
import { UserService } from './../../core/services/http/api/user/user.service';
import { DOCUMENT } from '@angular/common';

import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Product } from 'src/app/shared/utilities/interfaces/product';
import { CategoryService } from '../../core/services/http/api/categories/category.service';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('filters') private filters: ElementRef;
  @ViewChild('icon') private icon: ElementRef;
  @ViewChild('filtersTexts') private filtersTexts: ElementRef;
  @ViewChild('filterTags') private tags: ElementRef;
  @ViewChild('searchBar') private searchBar: ElementRef;
  opened = false;
  products = [];
  totalPages: Number;
  apiUrl: string;
  searchInput = '';
  production = environment.production;
  currentFilter: HTMLElement;
  categories = []
  selectedFilter;
  skeletonLoader = Array(10);
  skeletonFilters = Array(3);
  filteredProducts: Array<Product> = [];
  constructor(
    @Inject(DOCUMENT) public document,
    private r: Renderer2,
    private productService: ProductsService,
    private categoryService: CategoryService
  ) {
    this.r.setStyle(document.body, 'background-color', ' #f3f3f3');
  }
  ngOnDestroy() {
    this.r.removeStyle(document.body, 'background-color')
  }
  ngOnInit(): void {
    if (!this.production) {
      this.apiUrl = `${environment.uploadsUrl}/`;
    } else {
      // do staff with gcp service
    }
    this.productService.getProducts(1, 10).subscribe((resp) => {
      this.products = resp.response.products;
      this.totalPages = resp.response.totalPages;
      this.categoryService.getAllCategories().subscribe((res: any) => {
        this.categories.push(...res.response);
        fromEvent(this.searchBar.nativeElement, 'input')
          .pipe(map((event: Event) => (event.target as HTMLInputElement).value),
            debounceTime(2000))
          .subscribe(data => {
            if (this.searchInput !== '' || data === '') {
              this.deleteTag();
            }
            this.categoryService.filterProductsByInput(data, 1).subscribe((res: any) => {
              if (this.currentFilter) {
                this.currentFilter.classList.remove('selectedFilter');
                this.currentFilter = undefined;
                this.deleteTag();
              }
              if (data === '') {
                this.filteredProducts = res.response;
                return;
              } else {
                this.createTag(data);
                this.searchInput = data;
                this.filteredProducts = res.response;
              }
            })
          }
          );
      })
    });
  }
  toggleMenu() {
    if (!this.opened) {
      this.icon.nativeElement.classList.remove('defaultRotationArrow');
      this.opened = !this.opened;
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
      this.opened = !this.opened;
    }
  }

  filterProducts(text: HTMLElement, category?, subcategory?) {
    text.classList.toggle('selectedFilter');
    if (this.currentFilter) {
      this.deleteTag();
    }
    if (this.currentFilter && this.currentFilter !== text) {
      this.currentFilter.classList.remove('selectedFilter');
      this.currentFilter = text;
      this.createTag(text.textContent);
      this.categoryService.filterProductByCategory(category, subcategory, 1).subscribe((res: any) => {
        if (res.status) {
          res.response.length <= 0 ? this.filteredProducts = [] : this.filteredProducts = res.response
          this.currentFilter = text;
          console.log(this.filteredProducts.length);
        }
      })
    } else {
      if (this.currentFilter === text) {
        this.currentFilter = null;
        this.filteredProducts = [];
      } else {
        this.createTag(text.textContent);
        this.categoryService.filterProductByCategory(category, subcategory, 1).subscribe((res: any) => {
          if (res.status) {
            this.filteredProducts = res.response;
            this.currentFilter = text;
          }
        })
      }
    }
  }
  createTag(textToAdd: string) {
    const tag = `<span
    class="px-4 py-2 font-Josefin text-white bg-indigoPink-600 rounded-full lg:text-xs lg:py-1"
    >${textToAdd}</span
    >`;
    this.tags.nativeElement.innerHTML += tag;
  }
  deleteTag() {
    const child = [...this.tags.nativeElement.children];
    child.forEach((e) => {
      this.tags.nativeElement.removeChild(e);
    })
  }
}
