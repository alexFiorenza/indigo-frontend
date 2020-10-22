import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sales'
})
export class SalesPipe implements PipeTransform {

  transform(value: any, arg: number): number {
    const percentageNumber = arg / 100;
    const discount = value - (value * percentageNumber);
    return discount;
  }

}
