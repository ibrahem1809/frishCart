import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor(private _CartService:CartService, private _Renderer2:Renderer2){}
  cartDetails:any = null
  ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next:(respons)=>{
        this.cartDetails=respons.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  removeItem(id:any,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,"disabled","true")
    this._CartService.removeCartItem(id).subscribe({
      next:(respons)=>{
        this.cartDetails=respons.data;
        this._Renderer2.removeAttribute(element,"disabled");
        this._CartService.cartNumber.next(respons.numOfCartItems)
      },
      error:()=>{
        this._Renderer2.removeAttribute(element,"disabled")
      }
    })
  }

  changeCount(count:number, id:string,el:HTMLButtonElement,el2:HTMLButtonElement):void{
    this._Renderer2.setAttribute(el,"disabled","true")
    this._Renderer2.setAttribute(el2,"disabled","true")
    if(count >= 1){
      this._CartService.upDateCartCount(id, count).subscribe({
      next:(respons)=>{
        this.cartDetails=respons.data;
        this._Renderer2.removeAttribute(el,"disabled")
        this._Renderer2.removeAttribute(el2,"disabled")
      }
    })
    }
  }

  clear():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        if(res.message === 'success'){
          this.cartDetails = null;
          this._CartService.cartNumber.next(0)
        }
      }
    })
  }
}
