import { Observable } from 'rxjs';
import { LoaderBtnComponent } from './../loader-btn/loader-btn.component';
import { Injectable, ComponentFactoryResolver, ComponentFactory } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageComponentsService {

  constructor(private resolver: ComponentFactoryResolver) { }

  instantiateBtnLoader(loader, textBtn, status = 'progress') {
    loader.clear();
    const factory = this.resolver.resolveComponentFactory(LoaderBtnComponent);
    const componentRef = loader.createComponent(factory);
    componentRef.instance.textBtn = textBtn;
    componentRef.instance.status = status;
    return componentRef;
  }


}
