import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavOneComponent } from 'src/app/components/nav-one/nav-one.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule , NavOneComponent , RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {
  goToUp():void{
    window.scrollTo(0,0)
  }
}
