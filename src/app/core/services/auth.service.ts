import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
  userInfo:any;
  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/auth/'
  rejester(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl+ 'signup', userData)
  }
  login(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl+ 'signin', userData)
  }

  decodeUser():void {
    let user_Info = localStorage.getItem('elToken');
    if(user_Info !== null ){
      let deCode = jwtDecode(user_Info);
      this.userInfo = deCode;
      console.log(deCode);
    }
  }
}
