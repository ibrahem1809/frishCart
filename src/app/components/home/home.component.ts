import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducteService } from 'src/app/core/services/producte.service';
import { Product } from 'src/app/core/interface/product';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { Categorie } from 'src/app/core/interface/categorie';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CutTextPipe, CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _ProducteService:ProducteService , private _CartService:CartService,private _ToastrService:ToastrService, private _Renderer2:Renderer2, private _WishlistService:WishlistService){}
  producte:Product[] = [];
  categorie:Categorie[] = [];
  WishlistData:string[]=[]
  term:string = ''
  ngOnInit(): void {
    this._ProducteService.getProductes().subscribe({
      next: (res)=>{
        this.producte = res.data;
      },
    });
    this._ProducteService.getCategories().subscribe({
      next: (res)=>{
        this.categorie = res.data
      },
    });
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
        console.log(res)
        this._ToastrService.success(res.message)
        this.WishlistData = res.data
      }
    })
  }
  removeWish(prodId:string|undefined):void{
    this._WishlistService.removeWishList(prodId).subscribe({
      next:(res)=>{
        console.log(res)
        this._ToastrService.success(res.message)
        this.WishlistData = res.data
      }
    })
  }
  categorieOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:7000,
    autoplaySpeed:1000,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  mainSlaidOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:5000,
    autoplaySpeed:1000,
    navText: ['', ''],
    items:1,
    nav: false
  }
}
