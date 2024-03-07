import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducteService } from 'src/app/core/services/producte.service';
import { Product } from 'src/app/core/interface/product';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private _ProducteService:ProducteService, private _Renderer2:Renderer2, private _CartService:CartService, private _ToastrService:ToastrService){}
  products:Product[] =[]
  pageSize:number = 0
  currentPage:number = 1
  total:number = 0
  ngOnInit(): void {
    this._ProducteService.getProductes().subscribe({
        next: (res)=>{
          console.log(res);
          this.products = res.data;
          this.pageSize = res.metadata.limit;
          this.currentPage = res.metadata.currentPage;
          this.total = res.results;
        },
      });
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
  pageChanged(event:any):void{
    this._ProducteService.getProductes(event).subscribe({
        next: (res)=>{
          console.log(res);
          this.products = res.data;
          this.pageSize = res.metadata.limit;
          this.currentPage = res.metadata.currentPage;
          this.total = res.results;
        },
      });
  }
}
