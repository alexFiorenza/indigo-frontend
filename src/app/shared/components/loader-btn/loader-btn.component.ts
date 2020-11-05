import { Component, Input, OnInit, ElementRef, AfterViewInit, AfterContentInit, ViewChild, DoCheck } from '@angular/core';

@Component({
  selector: 'app-loader-btn',
  templateUrl: './loader-btn.component.html',
  styleUrls: ['./loader-btn.component.scss']
})
export class LoaderBtnComponent implements OnInit, AfterViewInit, DoCheck {

  @Input() textBtn;
  @Input() status: string;
  @ViewChild('loader') private loader: ElementRef;
  @ViewChild('sucessCheck') private sucessCheck: ElementRef;
  @ViewChild('errorIcon') private error: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.textBtn.nativeElement.classList.add('hidden');
    this.loader.nativeElement.classList.remove('hidden');
  }
  ngDoCheck() {
    if (this.status === 'completed') {
      this.loader.nativeElement.classList.add('hidden');
      this.sucessCheck.nativeElement.classList.remove('hidden');
    } else if (this.status === 'error') {
      this.loader.nativeElement.classList.add('hidden');
      this.error.nativeElement.classList.remove('hidden');
    }
  }
}
