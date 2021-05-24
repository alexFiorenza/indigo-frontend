import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {
  transform(value?: string, args?) {
    const apiUrl = `${environment.uploadsUrl}/`;
    if (value.startsWith('https')) {
      return value;
    } else {
      return apiUrl + value;
    }
  }
}
