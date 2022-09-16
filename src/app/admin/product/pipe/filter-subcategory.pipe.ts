import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSubcategory'
})
export class FilterSubcategoryPipe implements PipeTransform {

  transform(value: any, selectCategory: any) {
    return value.filter(function(selectItem:any) {
      return 
    });
  }

}
