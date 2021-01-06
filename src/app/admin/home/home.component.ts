import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import lootie from 'lottie-web';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { SlidesService } from '../../core/services/http/api/slides/slides.service';
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
  dates: Date[];
  slides: any[];
  public createSlideForm: FormGroup;
  public selectedRoute;
  public availableRoutes: any[] = [];
  public colorBtn = '#707070'
  public colorTexts = '#ffff'
  public selectedFile;
  selectedDate: Date;
  public uploadsUrl = environment.uploadsUrl
  display: boolean = false;
  cards: Card[] = [{
    data: 1000,
    text: 'Usuarios registrados',
    icon: 'person',
    color: '#B6DBFB'
  },
  {
    data: 200,
    text: 'Pedidos registrados',
    icon: 'bag',
    color: '#FACCB6'
  },
  {
    data: 150.3,
    text: 'Renumeración',
    icon: 'card',
    color: '#B6FBD6'
  }]
  constructor(private router: Router, private formBuilder: FormBuilder, private slidesService: SlidesService) {
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
    this.slides = [
      {
        title: 'Nuestras ofertas',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat velit non lacus tristique accumsan.',
        color: '#F086A3'
      },
      {
        title: 'Contacta con nosotros ',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat velit non lacus tristique accumsan.',
        color: '#B6DBF8'
      },
      {
        title: 'Nuestras ofertas',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat velit non lacus tristique accumsan.',
        color: '#F086A3'
      },
      {
        title: 'Nuestras ofertas',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat velit non lacus tristique accumsan.',
        color: '#F086A3'
      },
      {
        title: 'Contacta con nosotros ',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat velit non lacus tristique accumsan.',
        color: '#B6DBF8'
      },
      {
        title: 'Nuestras ofertas',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat velit non lacus tristique accumsan.',
        color: '#F086A3'
      }
    ]
  }
  inputHasChanged() {
    if (!this.selectedDate) {
      return;
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
  editSlide(id) {

  }

  fileCharged(file) {
    const uploadedFile = file.currentFiles[0];
    this.selectedFile = uploadedFile;
  }
}
