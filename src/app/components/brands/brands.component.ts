import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducteService } from 'src/app/core/services/producte.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Brand } from 'src/app/core/interface/brand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  constructor(private _ProducteService:ProducteService,private _NgxSpinnerService:NgxSpinnerService){}

  getBrandsSubscribe:Subscription = new Subscription();
  brandsData:Brand[] = [];


  ngOnInit(): void {
    this._NgxSpinnerService.show();

    this.getBrandsSubscribe = this._ProducteService.getAllBrands().subscribe({
      next:(response)=>{
        this.brandsData = response.data
        this._NgxSpinnerService.hide();
      }
    })
  }

  ngOnDestroy(): void {
    this.getBrandsSubscribe.unsubscribe();
  }

}
