import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/auth/'
  forgotPassword(userEmail:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'forgotPasswords',userEmail)
  }
  resetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'verifyResetCode',resetCode)
  }
  resetPassword(resetPass:object):Observable<any>{
    return this._HttpClient.put(this.baseUrl + 'resetPassword',resetPass)
  }
}
