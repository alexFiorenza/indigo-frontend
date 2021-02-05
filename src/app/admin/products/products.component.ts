import { Router, ActivatedRoute } from '@angular/router';
import { map, debounceTime } from 'rxjs/operators';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit, QueryList, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product } from '../../shared/utilities/interfaces/product';
import { ProductsService } from '../../core/services/http/api/products/products.service';
import { UserService } from '../../core/services/http/api/user/user.service';
import { fromEvent } from 'rxjs';
import { CategoryService } from '../../core/services/http/api/categories/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  public products: Product[] = [];
  public totalPages = 0;
  public pagesArrayNumber;
  public currentPage;
  public filteredProducts: Product[] = [];
  public previousFilter: HTMLElement;
  public previousLine: HTMLElement;
  public uploadsUrl = environment.uploadsUrl;
  public deletingProducts = false;
  public editingProducts = false;
  public alertEmmited = false;
  public searchText: string;
  public skeletonLoader = Array(12);
  public totalProductsPageReference;
  @Output() public createProductAlert = new EventEmitter();
  @Output() public emitAlert = new EventEmitter();
  @ViewChild('searchBar') searchBarInput: ElementRef;
  @ViewChildren('product') private productsContainer: QueryList<ElementRef>;
  constructor(private productsService: ProductsService, private categoryService: CategoryService, private router: Router, private productService: ProductsService,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (Object.keys(params).length === 0 && params.constructor === Object) {
        this.currentPage = 1;
        this.router.navigate(['/administrar/productos'], { queryParams: { pagina: this.currentPage } })
      } else {
        this.currentPage = parseInt(params.pagina);
      }
    })
    this.productsService.getProducts(this.currentPage, 12).subscribe((value) => {
      this.products = value.response.products;
      this.totalPages = value.response.totalPages;
      this.totalProductsPageReference = this.totalPages;
      this.pagesArrayNumber = Array(this.totalPages);
      fromEvent(this.searchBarInput.nativeElement, 'input')
        .pipe(map((event: Event) => (event.target as HTMLInputElement).value),
          debounceTime(2000))
        .subscribe((data: any) => {
          this.categoryService.filterProductsByInput(data, 1).subscribe((value: any) => {
            this.filteredProducts = value.response.result;
            if (value === '') {
              this.filteredProducts = [];
              this.totalPages = this.totalProductsPageReference;
              this.pagesArrayNumber = Array(this.totalPages);
              return;
            } else {
              this.filteredProducts = value.response.result;
              this.totalPages = value.response.totalPages;
              this.currentPage = 1;
              this.pagesArrayNumber = Array(this.totalPages);
            }
          })
        }
        );
    })
  }
  ngAfterViewInit() {



  }
  changeFilter(textContainer: HTMLElement, activeLine: HTMLElement) {
    this.previousFilter.classList.toggle('opacity-50');
    this.previousLine.classList.toggle('hidden');
    textContainer.classList.toggle('opacity-50');
    activeLine.classList.toggle('hidden');
    this.previousFilter = textContainer;
    this.previousLine = activeLine;
  }
  editProducts(editContainer: HTMLElement) {
    if (!this.deletingProducts) {
      editContainer.classList.toggle('selectedEdit')
      this.editingProducts = !this.editingProducts;
      this.productsContainer.forEach((p: ElementRef) => {
        const editIcon: HTMLElement = p.nativeElement.firstChild.children[0]
        p.nativeElement.classList.toggle('vibrate-1')
        if (editIcon.classList.contains('hidden')) {
          editIcon.classList.toggle('hidden');
        }
        p.nativeElement.firstChild.classList.toggle('hidden');
        p.nativeElement.firstChild.classList.toggle('flex');
      })
    }
  }
  searchBar() {

  }
  deleteProduct(deleteContainer: HTMLElement) {
    if (!this.editingProducts) {
      this.deletingProducts = !this.deletingProducts;
      deleteContainer.classList.toggle('selectedDelete');
      this.productsContainer.forEach((p: ElementRef) => {
        p.nativeElement.classList.toggle('vibrate-1');
        p.nativeElement.firstChild.classList.toggle('hidden');
        p.nativeElement.firstChild.classList.toggle('flex');
        const trashIcon: HTMLElement = p.nativeElement.firstChild.children[1];
        p.nativeElement.firstChild.children[0].classList.toggle('hidden');
        trashIcon.classList.toggle('hidden');
      })
    }
  }
  addProduct() {
    this.alertEmmited = !this.alertEmmited;
    this.createProductAlert.emit({
      showAlert: this.alertEmmited,
      createProduct: true
    })
  }
  removeProduct(product: Product) {
    swal.fire({
      title: '¿Estas seguro?',
      text: `Estas por eliminar ${product.name}`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteSingleProduct(product._id).subscribe((res: any) => {
          if (res.status) {
            swal.fire({
              title: 'Perfecto',
              icon: 'success',
              text: '¡El producto se ha eliminado correctamente!',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
        })
      }
    })

  }
  hasToEmitAlert(actualProduct?) {
    this.alertEmmited = !this.alertEmmited;
    if (!actualProduct) {
      this.emitAlert.emit(this.alertEmmited);
    } else {
      this.emitAlert.emit({
        showAlert: this.alertEmmited,
        product: actualProduct
      })
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.router.navigate(['/administrar/productos'], { queryParams: { pagina: this.currentPage } })
      this.productService.getProducts(this.currentPage, 12).subscribe((resp) => {
        this.products = resp.response.products;
      })
    } else {
      console.error('Cant go to page 0')
      return;
    }
  }
  nextPage() {
    if (this.currentPage >= this.totalPages) {
      console.error('Max page number reached');
      return;
    }
    this.currentPage++;
    this.router.navigate(['/administrar/productos'], { queryParams: { pagina: this.currentPage } })
    if (this.filteredProducts.length <= 0) {
      this.productService.getProducts(this.currentPage, 12).subscribe((resp) => {
        this.products = resp.response.products;
      })
    }
  }
}
