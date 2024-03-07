import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducteService } from 'src/app/core/services/producte.service';
import { Categorie } from 'src/app/core/interface/categorie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  constructor(private _ProducteService:ProducteService){}
  categorieData:Categorie[]=[]
  ngOnInit(): void {
    this._ProducteService.getCategories().subscribe({
      next:( response)=>{
        this.categorieData = response.data;
      }
    })
  }
}
