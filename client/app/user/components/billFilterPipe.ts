import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'billfilter'
})

@Injectable()
export class BillFilterPipe implements PipeTransform {
 transform(items: any[], field: string): any[] {
   if (!items) {
     return [];
   }
   return items.filter(it => it[field] === true);
 }
}
