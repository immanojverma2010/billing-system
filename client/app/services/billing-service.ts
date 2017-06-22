import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/map';


@Injectable()
export class BillingService {
        constructor(private http :Http) {
            console.log('Biller Service Initialized...');
          }

          findbills(value : any) {
            return this.http.get('/billing/findBills/' +value)
                .map((res:Response) => res.json());
          }

        storeBillingData(value : any) {
          console.log(value);

          var  bodyObj = value;

          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });

          let url = '/billing/addBill';

          return this.http.post(url, bodyObj, options)
                     .map((res:Response) => res.json());
              }


}
