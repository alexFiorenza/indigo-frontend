import { GovernmentService } from './../../core/services/http/government/government.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public repeatedPassword;
  public imgUrl: string;
  constructor(private formBuilder: FormBuilder,
    // tslint:disable-next-line: align
    @Inject(DOCUMENT) private document, private renderer: Renderer2) {
  }
  ngOnDestroy() {
    this.renderer.addClass(document.body, 'white');
  }
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'bg-indigoBlack-300');
  }
  componentAdded(event) {
    this.imgUrl = `../../../assets/${event.step}.svg`;
  }
}
