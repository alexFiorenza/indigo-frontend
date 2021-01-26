import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit, QueryList, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/utilities/interfaces/product';
import { ProductsService } from '../../core/services/http/api/products/products.service';
import { UserService } from '../../core/services/http/api/user/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  public products: Product[] = [];
  public previousFilter: HTMLElement;
  public previousLine: HTMLElement;
  public uploadsUrl = environment.uploadsUrl;
  public deletingProducts = false;
  public editingProducts = false;
  public alertEmmited = false;
  public searchText: string;
  public skeletonLoader = Array(12);
  @Output() public createProductAlert = new EventEmitter();
  @Output() public emitAlert = new EventEmitter();
  @ViewChildren('product') private productsContainer: QueryList<ElementRef>;
  constructor(private productsService: ProductsService) { }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.previousFilter = document.querySelector('#stock');
    this.previousLine = document.querySelector('#stockActive');
    this.productsService.getProducts(1, 12).subscribe((value) => {
      this.products = value.response.products;
    })
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
    console.log(this.searchText);
    //manage search bar (same logic as search bar in products user side)
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
  hasToEmitAlert(actualProduct = undefined) {
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

}
