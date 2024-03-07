import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-one',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-one.component.html',
  styleUrls: ['./nav-one.component.scss']
})
export class NavOneComponent implements OnInit {
  constructor(private _Router:Router, private _CartService:CartService, private _Renderer2:Renderer2, private _WishlistService:WishlistService){}
  @ViewChild('navBar') navElement!:ElementRef;
  //  دا بيشوف الميثود اللي بعده علطول ويشغلها
  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY > 300){
      this._Renderer2.addClass(this.navElement.nativeElement,'px-5')
      this._Renderer2.addClass(this.navElement.nativeElement,'shadow')
    }else{
      this._Renderer2.removeClass(this.navElement.nativeElement,'px-5')
      this._Renderer2.removeClass(this.navElement.nativeElement,'shadow')
    }
  }
  cartNum:number=0;
  WishListNum:number=0;
  ngOnInit():void {
    this._CartService.cartNumber.subscribe({
      next: (data)=>{
        this.cartNum = data
      },
    })
    this._CartService.getCartUser().subscribe({
      next:(response)=>{
        this.cartNum = response.numOfCartItems;
      }
    })
    this._WishlistService.wishListNumber.subscribe({
      next:(response)=>{
        this.WishListNum = response
      }
    })
    this._WishlistService.getWishList().subscribe({
      next:(response)=>{
        this.WishListNum = response.count;
      }
    })
  }
  signOut():void{
    localStorage.removeItem('elToken');
    this._Router.navigate(["/login"])
  }
}
