import lootie from 'lottie-web';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { ProductsService } from './../../core/services/http/api/products/products.service';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Product } from 'src/app/shared/utilities/interfaces/product';
import { CategoryService } from '../../core/services/http/api/categories/category.service';
import { fromEvent } from 'rxjs';
import { products } from '../../shared/utilities/mocks/product';


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
  loadNewData = false;
  loadingData = false;
  moreDataToShow = true;
  products = [];
  totalPages;
  pagesArrayNumber: Number[] = [];
  currentPage;
  apiUrl: string;
  searchInput = '';
  totalProductsPageReference = 0;
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
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.r.setStyle(document.body, 'background-color', ' #f3f3f3');
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const triggerAt = 0
    if (this.products.length > 0 && document.body.clientWidth <= 1024 && this.moreDataToShow) {
      if (document.body.scrollHeight - (window.innerHeight + window.scrollY) <= triggerAt) {
        if (this.loadingData) {
          return;
        }
        this.loadNewData = true;
        this.loadingData = true;
        this.currentPage++;
        this.productService.getProducts(this.currentPage, 12).subscribe((resp) => {
          this.loadNewData = false;
          this.loadingData = false;
          if (resp.response.products.length <= 0) {
            this.moreDataToShow = false;
            return;
          }
          this.products.push(...resp.response.products);
        })
      }
    }
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
    this.activatedRoute.queryParams.subscribe((params) => {
      if (Object.keys(params).length === 0 && params.constructor === Object) {
        this.currentPage = 1;
        this.router.navigate(['/productos'], { queryParams: { pagina: this.currentPage } })
      } else {
        this.currentPage = parseInt(params.pagina);
      }
    })
    if (this.currentPage > 0) {
      this.productService.getProducts(this.currentPage, 12).subscribe((resp) => {
        this.products = resp.response.products;
        this.totalPages = resp.response.totalPages;
        this.totalProductsPageReference = this.totalPages;
        this.pagesArrayNumber = Array(this.totalPages);
        this.categoryService.getAllCategories().subscribe((res: any) => {
          this.categories.push(...res.response);
          fromEvent(this.searchBar.nativeElement, 'input')
            .pipe(map((event: Event) => (event.target as HTMLInputElement).value),
              debounceTime(2000))
            .subscribe(data => {
              if (this.searchInput !== '' || data === '') {
                this.deleteTag();
              }
              this.categoryService.filterProductsByInput(data, 1, 12).subscribe((res: any) => {
                if (this.currentFilter) {
                  this.currentFilter.classList.remove('selectedFilter');
                  this.currentFilter = undefined;
                  this.deleteTag();
                }
                if (data === '') {
                  this.filteredProducts = [];
                  this.totalPages = this.totalProductsPageReference;
                  this.pagesArrayNumber = Array(this.totalPages);
                  return;
                } else {
                  this.createTag(data);
                  this.searchInput = data;
                  this.filteredProducts = res.response.result;
                  this.totalPages = res.response.totalPages;
                  this.currentPage = 1;
                  this.pagesArrayNumber = Array(this.totalPages);
                }
              })
            }
            );
          this.loaderAnimation();
        })
      });
    }

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
          res.response.length <= 0 ? this.filteredProducts = [] : this.filteredProducts = res.response.result
          if (this.filteredProducts.length <= 0) {
            this.currentPage = 1;
            this.totalPages = this.totalProductsPageReference;
            this.pagesArrayNumber = Array(this.totalPages);

          } else {
            this.totalPages = res.response.totalPages;
            this.currentPage = 1;
            this.currentFilter = text;
            this.pagesArrayNumber = Array(this.totalPages);
          }
          this.router.navigate(['/productos'], { queryParams: { pagina: this.currentPage } })
        }
      })
    } else {
      if (this.currentFilter === text) {
        this.currentFilter = null;
        this.filteredProducts = [];
        this.currentPage = 1;
        this.totalPages = this.totalProductsPageReference;
        this.pagesArrayNumber = Array(this.totalPages);
      } else {
        this.createTag(text.textContent);
        this.categoryService.filterProductByCategory(category, subcategory, 1).subscribe((res: any) => {
          if (res.status) {
            this.filteredProducts = res.response.result;
            this.totalPages = res.response.totalPages;
            this.currentPage = 1;
            this.pagesArrayNumber = Array(this.totalPages);
            this.currentFilter = text;
            this.router.navigate(['/productos'], { queryParams: { pagina: this.currentPage } })
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
  nextPage() {
    if (this.currentPage >= this.totalPages) {
      console.error('Max page number reached');
      return;
    }
    this.currentPage++;
    this.router.navigate(['/productos'], { queryParams: { pagina: this.currentPage } })
    if (this.filteredProducts.length <= 0) {
      this.productService.getProducts(this.currentPage, 12).subscribe((resp) => {
        this.products = resp.response.products;
      })
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.router.navigate(['/productos'], { queryParams: { pagina: this.currentPage } })
      this.productService.getProducts(this.currentPage, 12).subscribe((resp) => {
        this.products = resp.response.products;
      })
    } else {
      console.error('Cant go to page 0')
      return;
    }
  }
  loaderAnimation() {
    lootie.loadAnimation({
      container: document.querySelector('.loader'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets3.lottiefiles.com/packages/lf20_cbwxdqla.json'
    })
  }
}
