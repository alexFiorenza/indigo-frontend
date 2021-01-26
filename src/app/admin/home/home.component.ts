import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import lootie from 'lottie-web';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { SlidesService } from '../../core/services/http/api/slides/slides.service';
import { Product } from '../../shared/utilities/interfaces/product';
import { ProductsService } from '../../core/services/http/api/products/products.service';
import { CategoryService } from '../../core/services/http/api/categories/category.service';
import { MessageService } from 'primeng/api';
import { AnalyticsService } from '../../core/services/http/api/analytics/analytics.service';
interface Date {
  name: string,
  code: number
}
interface Card {
  data: number,
  text: string,
  icon: string,
  color: string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedSlide;
  isEditSlideOpen = false;
  fileToBeDeleted;
  products: Product[] = [];
  dates: Date[];
  slides: any[] = [];
  public selectedCategory;
  public addSubCategory = false;
  public subCategoryName;
  public categories: any[] = [];
  public addCategories = false;
  public skeleton = Array(3);
  public createSlideForm: FormGroup;
  public editSlideForm: FormGroup;
  public selectedRoute;
  public availableRoutes: any[] = [];
  public colorBtn = '#707070'
  public editColorBtn;
  public editColorTexts;
  public colorTexts = '#ffff'
  public selectedFile;
  public categoryName;
  public checkedSubCategories = false;
  selectedDate: Date = {
    name: 'Hoy', code: 1
  };
  public uploadsUrl = environment.uploadsUrl
  display: boolean = false;
  cards: Card[] = []
  public skeletonCards = Array(3);
  public skeletonHomeView = ['skeleton1', 'skeleton2'];
  public skeletonCategories = Array(3);
  constructor(private messageService: MessageService, private router: Router, private formBuilder: FormBuilder,
    private slidesService: SlidesService, private productService: ProductsService,
    private categoryService: CategoryService, private analyticsService: AnalyticsService) {
    this.dates = [
      { name: 'Hoy', code: 1 },
      { name: '7 dias', code: 7 },
      { name: '2 semanas', code: 14 },
      { name: '1 mes', code: 30 },
    ];
    this.router.config.forEach((r) => {
      const id = r.path.indexOf(':id');
      if (!r.canActivate && id < 0) {
        this.availableRoutes.push({
          name: r.path,
          code: r.path
        })
      }
    })
    this.createSlideForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      button: ['', [Validators.required]],
      selectedRoute: ['', [Validators.required]]
    })
    this.analyticsService.getCardsData(this.selectedDate.code).subscribe((res: any) => {
      this.cards = [{
        "data": res.response.users.count,
        "text": "Usuarios registrados",
        "icon": "person",
        "color": "#B6DBFB"
      },
      {
        "data": res.response.orders.count,
        "text": "Pedidos registrados",
        "icon": "bag",
        "color": "#FACCB6"
      },
      {
        "data": res.response.totalMoney,
        "text": "Renumeración",
        "icon": "card",
        "color": "#B6FBD6"
      }]
    })
  }
  loadBus() {
    lootie.loadAnimation({
      container: document.querySelector('#delivery'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets10.lottiefiles.com/packages/lf20_RJRDWS.json' // the path to the animation json
    });
  }
  deleteCategory(category) {
    swal.fire({
      title: '¿Estas seguro?',
      html: `Estas por eliminar la categoria: <strong>${category.name}</strong>`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(category._id).subscribe((res: any) => {
          if (res.status) {
            swal.fire({
              title: 'Perfecto',
              icon: 'success',
              text: '¡La categoria se ha eliminado correctamente!',
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
  saveCategory() {
    const data = {
      name: this.categoryName
    }
    this.categoryService.createCategory(data).subscribe((res: any) => {
      if (res.status) {
        swal.fire({
          icon: 'success',
          title: 'Perfecto',
          text: '¡Se ha creado correctamente la categoria!',
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
  deleteSubCategory(subcategory, category) {
    this.categoryService.deleteSubCategory(subcategory, category._id).subscribe((res: any) => {
      if (res.status) {
        this.messageService.add({ key: 'success', severity: 'success', summary: '¡Perfecto!', detail: 'Subcategoria eliminada' });
      } else {
        this.messageService.add({ key: 'error', severity: 'error', summary: '¡Oops!', detail: 'Ha ocurrido un error' });
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
  }
  saveSubCategory() {
    this.categoryService.updateSubCategory({ name: this.categoryName }, this.selectedCategory._id).subscribe((res: any) => {
      if (res.status) {
        swal.fire({
          icon: 'success',
          title: 'Perfecto',
          text: '¡Se ha creado correctamente la subcategoria!',
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
  toggleSubCategory(category = undefined) {
    this.addSubCategory = !this.addSubCategory;
    if (this.selectedCategory) {
      this.selectedCategory = null;
      return;
    }
    this.selectedCategory = category;
  }
  showDialog() {
    this.display = true;
  }
  loadWallet() {
    lootie.loadAnimation({
      container: document.querySelector('#wallet'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets6.lottiefiles.com/datafiles/GIJ8cxBxDJ2Bwhy/data.json' // the path to the animation json
    });
  }
  loadAnalytics() {
    lootie.loadAnimation({
      container: document.querySelector('#analytics'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets8.lottiefiles.com/packages/lf20_DaD4lb.json' // the path to the animation json
    });
  }

  ngOnInit(): void {
    this.loadBus();
    this.loadWallet();
    this.loadAnalytics();
    this.slidesService.getAllSlides().subscribe((response: any) => {
      this.slides = response.response;
    })
    //TODO Create custom currency pipe 
    this.productService.getHomeViewProducts().subscribe((res: any) => {
      this.products = res.response;
    })
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res.response;
    })
  }
  inputHasChanged() {
    if (!this.selectedDate) {
      return;
    } else {
      console.log(this.selectedDate.code)
      this.analyticsService.getCardsData(this.selectedDate.code).subscribe((res: any) => {
        this.cards = [{
          "data": res.response.users.count,
          "text": "Usuarios registrados",
          "icon": "person",
          "color": "#B6DBFB"
        },
        {
          "data": res.response.orders.count,
          "text": "Pedidos registrados",
          "icon": "bag",
          "color": "#FACCB6"
        },
        {
          "data": res.response.totalMoney,
          "text": "Renumeración",
          "icon": "card",
          "color": "#B6FBD6"
        }]
      })
    }
  }
  addSlide() {
    const body = this.createSlideForm.value;
    delete body.selectedRoute;
    Object.assign(body, { btnDirection: this.createSlideForm.get('selectedRoute').value.code })
    Object.assign(body, { color: this.colorBtn, wordsColor: this.colorTexts })
    this.slidesService.createSlide(this.createSlideForm.value, this.selectedFile).subscribe((response: any) => {
      if (response.status) {
        swal.fire({
          icon: 'success',
          title: 'Perfecto',
          text: '¡Se ha creado correctamente la diapositiva!',
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
  editSlide(slide) {
    this.selectedSlide = slide;
    console.log(this.selectedSlide.btnDirection);
    this.editSlideForm = this.formBuilder.group({
      title: [this.selectedSlide.title, [Validators.required]],
      description: [this.selectedSlide.description, [Validators.required]],
      button: [this.selectedSlide.button, [Validators.required]],
      selectedRoute: [this.selectedSlide.btnDirection, [Validators.required]]
    })
    this.isEditSlideOpen = true;
    this.editColorBtn = this.selectedSlide.color;
    this.editColorTexts = this.selectedSlide.wordsColor;
  }
  saveChangesSlide() {
    const body = this.editSlideForm.value;
    if (body.btnDirection === undefined) {
      delete body.btnDirection
    }
    Object.assign(body, { color: this.editColorBtn, wordsColor: this.editColorTexts })
    if (this.fileToBeDeleted && this.selectedFile) {
      Object.assign(body, { deleteFile: this.fileToBeDeleted })
    }
    //Update slide
    this.slidesService.updateSlides(this.selectedSlide._id, body, this.selectedFile).subscribe((response: any) => {
      if (response.status) {
        swal.fire({
          icon: 'success',
          title: 'Perfecto',
          text: '¡La diapositiva se ha actualizado!',
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
  toggleCategory() {
    this.addCategories = !this.addCategories;
  }
  fileCharged(file, upload = false) {
    if (upload) {
      this.fileToBeDeleted = this.selectedSlide.images[0].image
    }
    const uploadedFile = file.currentFiles[0];
    this.selectedFile = uploadedFile;
    console.log(this.selectedFile);
  }
  reloadView() {
    window.location.reload();
  }
}
