import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { SkeletonModule } from 'primeng/skeleton';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card'
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule,
    InputSwitchModule,
    OverlayPanelModule,
    VirtualScrollerModule,
    SkeletonModule,
    FileUploadModule,
    InputTextareaModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    DropdownModule
  ],
  providers: [MessageService]
})
export class PrimengModule { }
