import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { Product } from '../shared/utilities/interfaces/product';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, AfterContentInit {
  public previousDiv: HTMLElement;
  public actualRoute;
  public hasToShowAlert = false;
  public actualProduct: Product;
  public selectedColor;
  public selectedSize;
  public sizes = [];
  public color = '#707070'
  public isEditing = false;
  public shouldOpenModal = false;
  public colorsToDelete = [];
  public addedColors = [];
  @ViewChild('colorPicker') public colorPicker: ElementRef;
  @ViewChild('addColors') public addColors: ElementRef;
  @ViewChild('editText') public editColorText: ElementRef;
  @ViewChildren('deleteColors') public deleteColors: QueryList<ElementRef>;
  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
  }
  ngAfterContentInit() {
    this.actualRoute = this.activatedRoute.snapshot.firstChild.routeConfig.path
    switch (this.actualRoute) {
      case 'productos':
        this.previousDiv = document.querySelector('#productsTransition');
        this.previousDiv.classList.toggle('hidden');
        break;
      case 'ordenes':
        this.previousDiv = document.querySelector('#ordersTransition')
        this.previousDiv.classList.toggle('hidden');
        break;
      default:
        this.previousDiv = document.querySelector('#homeTransition')
        this.previousDiv.classList.toggle('hidden');
        break;
    }
  }
  transitionRouter(div: HTMLElement) {
    if (!this.previousDiv) {
      this.previousDiv = div;
    } else {
      this.previousDiv.classList.add('hidden');
    }
    div.classList.toggle('hidden');
    this.previousDiv = div;
  }
  componentInitialized(component: ProductsComponent) {
    if (component.emitAlert) {
      component.emitAlert.subscribe((value) => {
        if (value.showAlert) {
          this.hasToShowAlert = value.showAlert;
          this.actualProduct = value.product;
        } else {
          this.hasToShowAlert = value;
        }

      })
    }
  }
  selectSize(event) {
  }
  colorSelected(event, colorSelected) {
    if (this.isEditing) {
      return;
    }
    const containerColor = event.currentTarget;
    this.sizes = colorSelected.sizes;
    const hex = this.getRGBValues(containerColor.style.backgroundColor);
    const r = hex[0];
    const g = hex[1];
    const b = hex[2];
    this.selectedColor = this.rgbToHex(r, g, b);
  }
  getRGBValues(str) {
    const sep = str.indexOf(',') > -1 ? ',' : ' ';
    return str.substr(4).split(')')[0].split(sep).map(Number);
  }
  rgbToHex(r, g, b) {
    // tslint:disable-next-line: no-bitwise
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  addColorPicker() {
    this.shouldOpenModal = !this.shouldOpenModal;
    this.colorPicker.nativeElement.classList.remove('hidden');
  }
  colorChanged(event) {
    this.addedColors.push({
      color: event,
      available: true,
      sizes: []
    });

    this.colorPicker.nativeElement.classList.add('hidden');
  }
  editColors(text: string) {
    this.sizes.length > 0 ? this.sizes = [] : false;
    text === 'editar' ? text = 'cancelar' : text = 'editar';
    this.editColorText.nativeElement.textContent = text;
    this.addColors.nativeElement.classList.toggle('hidden');
    this.isEditing = !this.isEditing;
    this.deleteColors.forEach((p) => {
      p.nativeElement.classList.toggle('hidden');
    })
  }
  deleteColor(color) {
    this.colorsToDelete.push({
      available: false,
      color: color.color,
      sizes: color.sizes
    });
    this.colorsToDelete.forEach((c) => {
      if (this.addedColors.length > 0) {
        this.addedColors.forEach((p) => {
          if (p.color === c.color) {
            const i = this.actualProduct.color.indexOf(p);
            this.addedColors.splice(i, 1);
          }
        })
      }
      this.actualProduct.color.forEach((p) => {
        if (p.color === c.color) {
          const i = this.actualProduct.color.indexOf(p);
          this.actualProduct.color.splice(i, 1);
        }
      })
    })
  }
}
