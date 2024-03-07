import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProducteService } from 'src/app/core/services/producte.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
constructor(private _ActivatedRoute:ActivatedRoute, private _ProducteService:ProducteService,private _Renderer2:Renderer2, private _CartService:CartService, private _ToastrService:ToastrService){}
productId!:string | null;
productDetails:any = null;
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(prames)=>{
      this.productId = prames.get('id');
      console.log(this.productId)
    }
  })
  this._ProducteService.getpProductDetails(this.productId).subscribe({
    next:({data})=>{
      this.productDetails = data
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
}
