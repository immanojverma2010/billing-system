import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
        constructor(private http :Http) {
            console.log('User Service Initialized...');
          }

        addUser(value : any) {
          console.log(value);
          
          var  bodyObj = value;

          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });

          let url = '/users/addUser';

          return this.http.post(url, bodyObj, options)
                     .map((res:Response) => res.json());
              }

}
