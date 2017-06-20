import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
        constructor(private http :Http) {
            console.log('User Service Initialized...');
          }

          login(name: string, pwd :string) {
            console.log(name +" :" +pwd);
          var  bodyObj = {username: name, password: pwd};
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            let url = '/users/userLogIn';

            return this.http.post(url, bodyObj, options)
                       .map((res:Response) => res.json());
          }

            findDetails(value :any) {
              return this.http.get('/users/findUser/' +value)
                  .map((res:Response) => res.json());
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
