import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProducteService {

  constructor(private _HttpClient:HttpClient) {}
  baseUrl:String = "https://ecommerce.routemisr.com/api/v1/";
  getProductes(pageNum:number = 1):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `products?page=${pageNum}`)
  }
  getpProductDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `products/${id}`)
  }
  getCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'categories')
  }
  getCategoriyDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `categories/${id}`)
  }
  getAllBrands():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `brands`)
  }

  getBrandDetails(brandId:string):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `brands/${brandId}`)
  }
}
