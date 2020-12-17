import { environment } from 'src/environments/environment';
import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit, QueryList, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/utilities/interfaces/product';
import { ProductsService } from '../../core/services/http/api/products/products.service';

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
  public alertEmmited = false;
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
    editContainer.classList.toggle('selectedEdit')
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
  deleteProduct(deleteContainer: HTMLElement) {
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
