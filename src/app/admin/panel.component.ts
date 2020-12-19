import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { Product } from '../shared/utilities/interfaces/product';
import { ThrowStmt } from '@angular/compiler';
import { last } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Color {
  available?: boolean,
  color?: string,
  sizes?: Array<any>
}
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
  public selectedColor: Color;
  public selectedSize;
  public sizes = [];
  public color = '#707070'
  public isEditing = false;
  public shouldOpenModal = false;
  public colorsToDelete = [];
  public addedColors = [];
  public addedSizes = [];
  public lastSelectedColor: HTMLElement;
  public sizeToChange;
  @ViewChild('colorPicker') public colorPicker: ElementRef;
  @ViewChild('addColors') public addColors: ElementRef;
  @ViewChild('editText') public editColorText: ElementRef;
  @ViewChild('sizeText') public sizeText: ElementRef;
  @ViewChildren('deleteColors') public deleteColors: QueryList<ElementRef>;
  @ViewChildren('sizesContainer') public sizesContainer: QueryList<ElementRef>;
  public form: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      /**
       * 
       * Fill with inputs data
       * 
       */
    })
  }
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
  calculateBoxShadow(color) {
    const defaultValues = `0px 3px 6px ${color.color}`
    return defaultValues
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
  selectSize(event, size) {
    this.selectedSize = size;
    if (event.currentTarget.classList.contains('opacity-50')) {
      this.selectedColor.sizes.forEach((size: any) => {
        if (size.size === this.selectedSize.size) {
          const i = this.selectedColor.sizes.indexOf(size);
          this.selectedColor.sizes.splice(i, 1);
        }
      });
    }
  }
  colorSelected(event, colorSelected) {
    const containerColor: HTMLElement = event.currentTarget;
    if (this.lastSelectedColor) {
      this.lastSelectedColor.classList.toggle('shadow-inset-center');
    }
    if (this.isEditing) {
      return
    }
    this.selectedColor = colorSelected
    this.sizes = this.selectedColor.sizes;
    containerColor.classList.add('shadow-inset-center');
    this.lastSelectedColor = containerColor;
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
    this.selectedColor = undefined;
    text === 'editar' ? text = 'cancelar' : text = 'editar';
    this.editColorText.nativeElement.textContent = text;
    this.addColors.nativeElement.classList.toggle('hidden');
    this.isEditing = !this.isEditing;
    this.deleteColors.forEach((p) => {
      p.nativeElement.classList.toggle('hidden');
    })
  }
  editSize(text: String) {
    text === 'editar' ? text = 'cancelar' : text = 'editar';
    this.sizeText.nativeElement.textContent = text;
    //TODO Check delete style in sizes and delete them in respective color
    this.sizesContainer.forEach((p) => {
      p.nativeElement.classList.toggle('opacity-50');
      p.nativeElement.classList.toggle('border-2');
      p.nativeElement.classList.toggle('border-red-500');
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
  addSize(inputShow: HTMLElement) {
    if (this.selectedColor.sizes.length > 0) {
      const lastSize = this.selectedColor.sizes[this.selectedColor.sizes.length - 1];
      this.sizeToChange = parseInt(lastSize.size) + 1;
    } else {
      this.sizeToChange = 0;
    }
    inputShow.classList.toggle('hidden');
    inputShow.focus();
  }
}
