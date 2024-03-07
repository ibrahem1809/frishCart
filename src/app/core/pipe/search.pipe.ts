import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interface/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(Products: Product[],term:string): Product[] {
    return Products.filter((item)=> item.title.toLowerCase().includes(term.toLowerCase()));
  }

}
