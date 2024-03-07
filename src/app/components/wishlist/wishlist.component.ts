import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/core/interface/product';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  constructor(private _WishlistService:WishlistService, private _CartService:CartService,private _ToastrService:ToastrService, private _Renderer2:Renderer2){}
  producte:Product[] = [];
  WishlistData:string[]=[]
  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next:(res)=>{
        this.producte = res.data
      }
    })
    this._WishlistService.getWishList().subscribe({
      next:(res)=>{
        this.WishlistData = res.data.map((item:any)=>item._id);
      }
    })
  }
  addProduct(id: any, element:HTMLButtonElement): void{
    this._Renderer2.setAttribute(element, "disabled", "true");
    this._CartService.addTOCard(id).subscribe({
      next: (res)=>{
        this._ToastrService.success(res.message);
        this._Renderer2.removeAttribute(element, "disabled");
        this._CartService.cartNumber.next(res.numOfCartItems)
      },
    })
  }
  addWish(prodId:string|undefined):void{
    this._WishlistService.addToWishList(prodId).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message)
        this.WishlistData = res.data
        this._WishlistService.wishListNumber.next(res.data.length);
      }
    })
  }
  removeWish(prodId:string|undefined):void{
    this._WishlistService.removeWishList(prodId).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message)
        this.WishlistData = res.data
        let newData = this.producte.filter((item:any)=>this.WishlistData.includes(item._id))
        this.producte = newData
        this._WishlistService.wishListNumber.next(res.data.length);
      }
    })
  }
}
