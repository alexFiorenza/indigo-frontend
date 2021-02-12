import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {
  transform(value: string, args: string): string {
    return null;
  }
}
