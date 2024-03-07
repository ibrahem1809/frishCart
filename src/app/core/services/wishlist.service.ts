import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private _HttpClient:HttpClient) {}
  wishListNumber:BehaviorSubject<number> = new BehaviorSubject(0)
  baseUrl:String = "https://ecommerce.routemisr.com/api/v1/";
  addToWishList(prodId:string|undefined):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `wishlist` , { productId: prodId})
  }
  getWishList():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `wishlist`)
  }
  removeWishList(prodId:string|undefined):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `wishlist/${prodId}`)
  }
}
