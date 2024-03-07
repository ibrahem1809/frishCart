import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProducteService } from 'src/app/core/services/producte.service';
import { Categorie } from 'src/app/core/interface/categorie';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProducteService:ProducteService){}
  categoryId:string|null = '';
  CategoriyDetails:Categorie ={} as Categorie;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.categoryId = params.get('id')
      }
    })
    this._ProducteService.getCategoriyDetails(this.categoryId).subscribe({
      next:(res)=>{
        this.CategoriyDetails = res.data
      }
    })
  }
}
