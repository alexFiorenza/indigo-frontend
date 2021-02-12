import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseCurrency'
})
export class ParseCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {
  }
  transform(value: any, args: any[] = undefined) {
    const parsedCurrency = this.currencyPipe.transform(value, '$', 'symbol', '1.0');
    return parsedCurrency
  }
}
