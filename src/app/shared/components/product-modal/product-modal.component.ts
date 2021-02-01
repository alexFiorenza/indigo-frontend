import { environment } from './../../../../environments/environment';
import { SalesPipe } from './../../pipes/sales.pipe';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Component, Input, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Category, Subcategory, Product, Size, Color, Image } from '../../utilities/interfaces/product';
import { CategoryService } from '../../../core/services/http/api/categories/category.service';
import swal from 'sweetalert2';
import { ProductsService } from '../../../core/services/http/api/products/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParseCurrencyPipe } from '../../pipes/parse-currency.pipe';
@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {
  @Input() currentProduct: Product;
  @Input() alertShouldBeShow: Boolean = false;
  @Input() ShouldCreateProduct: Boolean = false;
  @Input() productPrice;
  @ViewChild('colorPicker') colorPicker: ElementRef;
  @ViewChild('addColors') addColors: ElementRef;
  @ViewChild('editText') editColorText: ElementRef;
  @ViewChild('sizeText') sizeText: ElementRef;
  @ViewChild('imgEditText') imgEditText: ElementRef;
  @ViewChildren('imgContainer') imgContainer: QueryList<ElementRef>;
  @ViewChildren('previewIMGContainer') previewIMGContainer: QueryList<ElementRef>;
  @ViewChildren('deleteColors') deleteColors: QueryList<ElementRef>;
  @ViewChildren('sizesContainer') sizesContainer: QueryList<ElementRef>;
  lastSelectedColor: HTMLElement;
  imagesToUpload: Array<FileList> = [];
  availableCategories: Array<Category> = [];
  addedSizes: Array<Size> = [];
  sizes: Array<Size> = [];
  addedColors: Array<Color> = [];
  colorsToDelete: Array<Color> = [];
  color = '#707070'
  previewImages: Array<any> = [];
  deleteFile: Image;
  selectedSize: Size;
  selectedColor: Color;
  sizeToChange: Number;
  isEditing = false;
  isOnFocus = false;
  shouldOpenModal = false;
  form: FormGroup;
  uplodsUrl = environment.uploadsUrl;
  constructor(private categoryService: CategoryService, private salesPipe: SalesPipe,
    private productService: ProductsService, private formBuilder: FormBuilder, private parseCurrency: ParseCurrencyPipe) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(10)]],
      homeView: [false, [Validators.required]],
      height: ['', [Validators.required, Validators.min(1)]],
      width: ['', [Validators.required, Validators.min(1)]],
      length: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
    })
  }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.availableCategories = res.response;
    })
  }
  /**
   ** Categories logic
   */
  loadCategories(reference: OverlayPanel, e) {
    reference.toggle(e);
  }
  addSubCategory(parentCategoryDB: Category, selectedSubCategory: Subcategory) {
    if (this.currentProduct.categories.length > 0) {
      //Check if subcategory is within the product
      this.currentProduct.categories.forEach((c) => {
        const tmp = c.subcategories.filter((sub) => sub.name === selectedSubCategory.name)
        if (tmp.length <= 0) {
          //Subcategory doesn't exist
          if (c.name === parentCategoryDB.name) {
            c.subcategories.push(selectedSubCategory)
          } else {
            const i = this.currentProduct.categories.filter((value) => {
              if (value.name === parentCategoryDB.name) {
                return value;
              }
            });
            if (i.length <= 0) {
              const categoryToStore = { ...parentCategoryDB };
              delete categoryToStore.subcategories;
              Object.assign(categoryToStore, { subcategories: [selectedSubCategory] });
              this.currentProduct.categories.push(categoryToStore);
            } else {
              return;
            }
          }
        } else {
          return;
        }
      })
    } else {
      //Add a new subcategory from empty array
      const categoryToStore = { ...parentCategoryDB };
      delete categoryToStore.subcategories;
      Object.assign(categoryToStore, { subcategories: [selectedSubCategory] });
      this.currentProduct.categories.push(categoryToStore);
    }
  }
  deleteCategory(category: string) {
    this.currentProduct.categories = this.currentProduct.categories.filter(v => v.name !== category)
  }
  /**
  ** Sizes logic
  */
  selectSize(event, size: Size) {
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
  addSize() {
    if (this.selectedColor.sizes.length > 0) {
      const lastSize = this.selectedColor.sizes[this.selectedColor.sizes.length - 1];
      this.sizeToChange = parseInt(lastSize.size) + 1;
    } else {
      this.sizeToChange = 35;
    }
    this.selectedColor.sizes.push({
      available: true,
      size: this.sizeToChange.toString()
    })
    console.log(this.selectedColor);
    this.addedSizes.push({
      available: true,
      size: this.sizeToChange.toString()
    })
  }
  /**
  ** Color logic
  */
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
    console.log(this.addedColors);
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
            const i = this.currentProduct.color.indexOf(p);
            this.addedColors.splice(i, 1);
          }
        })
      }
      this.currentProduct.color.forEach((p) => {
        if (p.color === c.color) {
          const i = this.currentProduct.color.indexOf(p);
          this.currentProduct.color.splice(i, 1);
        }
      })
    })
  }
  /**
  ** Image logic
  */
  editImages(text: String) {
    if (this.currentProduct) {
      if (this.currentProduct.images.length > 1 || text === 'cancelar') {
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
      this.isEditing = !this.isEditing;
      text === 'editar' ? text = 'cancelar' : text = 'editar';
      this.imgEditText.nativeElement.textContent = text;
      this.previewIMGContainer.forEach((e) => {
        e.nativeElement.firstChild.classList.toggle('hidden');
        e.nativeElement.children[1].classList.toggle('hidden');
      })
    }
  }
  deletePreviewIMG(index) {
    this.previewImages.splice(index, 1);
    this.imagesToUpload.splice(index, 1);
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
      this.currentProduct.images.forEach((i) => {
        if (i.uid === this.deleteFile.uid) {
          const index = this.currentProduct.images.indexOf(i);
          this.currentProduct.images.splice(index, 1);
        }
      })
    }
  }
  getImagePreview(fileUploaded: any) {
    this.imagesToUpload.push(fileUploaded.currentTarget.files[0])
    const fileReader = new FileReader();
    fileReader.readAsDataURL(fileUploaded.currentTarget.files[0]);
    fileReader.onload = ((e) => {
      this.previewImages.push(e.target.result);
    })
  }
  /**
  ** Price and sales logic
  */
  parseCurrencyPrice(event, update = false) {
    if (!update) {
      event.target.value = this.parseCurrency.transform(this.form.get('price').value)
    } else {
      event.target.value = this.parseCurrency.transform(this.productPrice);
    }
  }
  addSale(input: HTMLInputElement) {
    this.currentProduct.sale += 10;
    this.productPrice = this.salesPipe.transform(this.currentProduct.price, this.currentProduct.sale)
    this.productPrice = Math.ceil(this.productPrice);
    this.productPrice = this.parseCurrency.transform(this.productPrice)
    input.focus();
    this.isOnFocus = true;
  }
  focusOnInputDiscount(input: HTMLInputElement) {
    this.currentProduct.sale = parseInt(input.value);
    if (input === document.activeElement) {
      this.isOnFocus = true;
    } else {
      this.isOnFocus = !this.isOnFocus;
    }
    if (this.currentProduct.sale >= 5) {
      this.productPrice = this.salesPipe.transform(this.currentProduct.price, this.currentProduct.sale)
    } else {
      this.productPrice = this.currentProduct.price;
    }
    this.productPrice = Math.ceil(this.productPrice);
  }
  /**
  ** Styles and utilities
  */
  discardChanges() {
    window.location.reload();
  }
  calculateBoxShadow(color) {
    const defaultValues = `0px 3px 6px ${color.color}`
    return defaultValues
  }
  updateProduct(shouldCreate = false) {
    if (!shouldCreate) {
      if (this.addedColors.length > 0) {
        this.addedColors.forEach((c) => {
          const coincidence = this.currentProduct.color.find(e => {
            if (e.color === c.color) {
              return e
            }
          })
          if (!coincidence) {
            const i = this.addedColors.indexOf(c);
            this.addedColors.splice(i, 1);
            this.currentProduct.color.push(c);
          }
        })
      }
      const dataToSend = {
        ...this.currentProduct,
      }
      delete dataToSend.images
      delete dataToSend.color
      delete dataToSend.categories
      delete dataToSend.packageWeight
      Object.assign(dataToSend, { color: JSON.stringify(this.currentProduct.color) })
      Object.assign(dataToSend, { categories: JSON.stringify(this.currentProduct.categories) })
      if (this.deleteFile) {
        Object.assign(dataToSend, { deleteFile: this.deleteFile.image })
      }
      if (!this.currentProduct.sale) {
        this.currentProduct.sale = 0;
      }
      this.productService.editProduct(dataToSend, this.currentProduct._id, this.imagesToUpload).subscribe((response: any) => {
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
    } else {
      const formData = this.form.value;
      const dataToSend = {
        ...formData
      }
      Object.assign(dataToSend, { color: JSON.stringify(this.addedColors) })
      this.productService.createProduct(dataToSend, this.imagesToUpload).subscribe((response: any) => {
        if (response.status) {
          swal.fire({
            icon: 'success',
            title: 'Perfecto',
            text: '¡El producto se ha creado correctamente!',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
        } else {
          swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Al parecer ha ocurrido un error intenta de nuevo',
            confirmButtonText: 'Recargar'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
        }
      })
    }
  }
}
