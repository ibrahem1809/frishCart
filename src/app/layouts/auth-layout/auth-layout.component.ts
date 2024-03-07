import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTowComponent } from 'src/app/components/nav-tow/nav-tow.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule , NavTowComponent , RouterOutlet , FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {

}
