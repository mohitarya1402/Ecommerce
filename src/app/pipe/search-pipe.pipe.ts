import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/model/IProduct';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(value: any, filteredString: string) {
    if (value.length == 0 || filteredString == '') {
      return value;
    }
    let products: IProduct[] = [];
    products = value.filter((data: IProduct) => {
      return data.category.toLowerCase() == filteredString.toLowerCase();
    });
    console.log('pipe data ');
    console.log(products);
    return products;
  }
}
