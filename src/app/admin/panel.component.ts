import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesPipe } from './../shared/pipes/sales.pipe';
import { environment } from './../../environments/environment';
import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, QueryList, ViewChildren, ViewContainerRef, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { Product } from '../shared/utilities/interfaces/product';
import { DOCUMENT } from '@angular/common';
import { ProductsService } from '../core/services/http/api/products/products.service';
import swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';
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
  public deleteFile;
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
  public previewImages: Array<any> = [];
  public imagesToUpload: FileList[] = [];
  public lastSelectedColor: HTMLElement;
  public sizeToChange;
  public productPrice: number;
  public isOnFocus = false;
  public uplodsUrl = environment.uploadsUrl;
  public hasToCreateProduct = false;
  public form: FormGroup;
  @ViewChild('colorPicker') public colorPicker: ElementRef;
  @ViewChild('addColors') public addColors: ElementRef;
  @ViewChild('editText') public editColorText: ElementRef;
  @ViewChild('imgEditText') public imgEditText: ElementRef;
  @ViewChild('sizeText') public sizeText: ElementRef;
  @ViewChild('sizeInput', { read: ViewContainerRef }) public sizeInput: ViewContainerRef;
  @ViewChild('sizeContainerInputs') public sizeContainerInputs: ElementRef;
  @ViewChildren('deleteColors') public deleteColors: QueryList<ElementRef>;
  @ViewChildren('sizesContainer') public sizesContainer: QueryList<ElementRef>;
  @ViewChildren('imgContainer') public imgContainer: QueryList<ElementRef>;
  @ViewChildren('previewIMGContainer') public previewIMGContainer: QueryList<ElementRef>;
  constructor(private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) document, private r: Renderer2, private salesPipe: SalesPipe, private productService: ProductsService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(10)]],
    })
  }
  ngOnInit(): void {
    this.r.setStyle(document.body, 'overflow-x', 'hidden');
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
  discardChanges() {
    window.location.reload();
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
          this.productPrice = this.actualProduct.price;
          if (this.actualProduct.sale > 0) {
            this.productPrice = this.salesPipe.transform(this.actualProduct.price, this.actualProduct.sale)
            this.productPrice = Math.ceil(this.productPrice);
          }
        }
      })
    }
    component.createProductAlert.subscribe((value) => {
      if (value.showAlert) {
        this.hasToCreateProduct = true;
        this.hasToShowAlert = value.showAlert;
      } else {
        this.hasToShowAlert = value;
      }
    })
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
    if (this.selectedColor) {
      console.log(this.sizes);
      // this.addedSizes.forEach((c) => {
      //   this.selectedColor.sizes.push(c);
      // })
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
    this.isEditing = !this.isEditing;
    this.sizesContainer.forEach((p) => {
      p.nativeElement.classList.toggle('opacity-50');
      p.nativeElement.classList.toggle('border-2');
      p.nativeElement.classList.toggle('border-red-500');
    })
  }
  editImages(text: String) {
    if (this.actualProduct) {
      if (this.actualProduct.images.length > 1 || text === 'cancelar') {
        text === 'editar' ? text = 'cancelar' : text = 'editar';
        this.imgEditText.nativeElement.textContent = text;
        this.isEditing = !this.isEditing;
        this.imgContainer.forEach((e) => {
          e.nativeElement.firstChild.classList.toggle('opacity-50');
          e.nativeElement.lastChild.classList.toggle('hidden');
        })
      } else {
        swal.fire({
          text: 'Por lo menos debe de haber una imagen en el producto',
          title: '¡Atención!',
          icon: 'info'
        })
      }
    } else {
      text === 'editar' ? text = 'cancelar' : text = 'editar';
      this.imgEditText.nativeElement.textContent = text;
      this.previewIMGContainer.forEach((e) => {
        e.nativeElement.firstChild.classList.toggle('hidden');
        e.nativeElement.children[1].classList.toggle('hidden');
      })
    }
  }
  deleteRespectiveImg(img) {
    if (this.deleteFile) {
      swal.fire({
        text: 'No podes eliminar mas de una imagen por petición',
        title: '¡Atención!',
        icon: 'info'
      })
    } else {
      this.deleteFile = img;
      this.actualProduct.images.forEach((i) => {
        if (i.uid === this.deleteFile.uid) {
          const index = this.actualProduct.images.indexOf(i);
          this.actualProduct.images.splice(index, 1);
        }
      })
    }
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
  addSize() {
    if (this.selectedColor.sizes.length > 0) {
      const lastSize = this.selectedColor.sizes[this.selectedColor.sizes.length - 1];
      this.sizeToChange = parseInt(lastSize.size) + 1;
    } else {
      this.sizeToChange = 35;
    }
    this.selectedColor.sizes.push({
      available: true,
      size: this.sizeToChange
    })
    this.addedSizes.push({
      available: true,
      size: this.sizeToChange
    })
  }
  getImagePreview(fileUploaded: any) {
    this.imagesToUpload.push(fileUploaded.currentTarget.files[0])
    const fileReader = new FileReader();
    fileReader.readAsDataURL(fileUploaded.currentTarget.files[0]);
    fileReader.onload = ((e) => {
      this.previewImages.push(e.target.result);
    })
  }
  deleteCategory(category) {
    this.actualProduct.categories.forEach((c) => {
      if (c === category) {
        const i = this.actualProduct.categories.indexOf(c);
        this.actualProduct.categories.splice(i);
      }
    })
  }
  addSale(input: HTMLInputElement) {
    this.actualProduct.sale += 10;
    this.productPrice = this.salesPipe.transform(this.actualProduct.price, this.actualProduct.sale)
    this.productPrice = Math.ceil(this.productPrice);
    input.focus();
    this.isOnFocus = true;

  }
  focusOnInputDiscount(input: HTMLInputElement) {
    this.actualProduct.sale = parseInt(input.value);
    if (input === document.activeElement) {
      this.isOnFocus = true;
    } else {
      this.isOnFocus = !this.isOnFocus;
    }
    if (this.actualProduct.sale >= 5) {
      this.productPrice = this.salesPipe.transform(this.actualProduct.price, this.actualProduct.sale)
    } else {
      this.productPrice = this.actualProduct.price;
    }
    this.productPrice = Math.ceil(this.productPrice);
  }
  deletePreviewIMG(index) {
    this.previewImages.splice(index, 1);
    console.log(this.previewImages);
  }
  updateProduct() {
    if (this.addedColors.length > 0) {
      this.addedColors.forEach((c) => {
        const coincidence = this.actualProduct.color.find(e => {
          if (e.color === c.color) {
            return e
          }
        })
        if (!coincidence) {
          const i = this.addedColors.indexOf(c);
          this.addedColors.splice(i, 1);
          this.actualProduct.color.push(c);
        }
      })
    }
    const dataToSend = {
      ...this.actualProduct,
    }
    delete dataToSend.images
    delete dataToSend.color
    delete dataToSend.categories
    Object.assign(dataToSend, { color: JSON.stringify(this.actualProduct.color) })
    Object.assign(dataToSend, { categories: JSON.stringify(this.actualProduct.categories) })
    if (this.deleteFile) {
      Object.assign(dataToSend, { deleteFile: this.deleteFile.image })
    }
    if (!this.actualProduct.sale) {
      this.actualProduct.sale = 0;
    }
    this.productService.editProduct(dataToSend, this.actualProduct._id, this.imagesToUpload).subscribe((response: any) => {
      if (response.status) {
        swal.fire({
          icon: 'success',
          title: 'Perfecto',
          text: '¡El producto se ha actualizado correctamente!',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      }
    })
  }
}
