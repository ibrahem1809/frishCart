import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ProducteService } from 'src/app/core/services/producte.service';
import { Subscription } from 'rxjs';
import { Brand } from 'src/app/core/interface/brand';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent {
  constructor(private _ProducteService:ProducteService,private _ActivatedRoute:ActivatedRoute,private _NgxSpinnerService: NgxSpinnerService){}

  _ActivatedRouteSubscribe:Subscription = new Subscription();
  getBrandDetailsSubscribe:Subscription = new Subscription();
  brandData:Brand = {} as Brand;
  brandId:any;

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._ActivatedRouteSubscribe = this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.brandId = params.get('id');
      }
    })

    this.getBrandDetailsSubscribe = this._ProducteService.getBrandDetails(this.brandId).subscribe({
      next:(response)=>{
        this.brandData = response.data;
        this._NgxSpinnerService.hide();
      }
    })
  }

  ngOnDestroy(): void {
    this._ActivatedRouteSubscribe.unsubscribe();
    this.getBrandDetailsSubscribe.unsubscribe();
  }
}
