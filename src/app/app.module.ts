import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { AllordersComponent } from './components/allorders/allorders.component';
import { MyHttpInterceptor } from './core/interceptors/my-http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LodingInterceptor } from './core/interceptors/loding.interceptor';
import { WishlistComponent } from './components/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:MyHttpInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LodingInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
