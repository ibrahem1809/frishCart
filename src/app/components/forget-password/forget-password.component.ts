import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordService } from 'src/app/core/services/forgot-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(private _ForgotPasswordService:ForgotPasswordService, private _Router:Router){}
  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;
  email:string ='';
  userMsg:string = '';

  forgotForm:FormGroup = new FormGroup({
    email:new FormControl('')
  })
  resetCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl('')
  })
  resetPasswordForm:FormGroup = new FormGroup({
    newPassword:new FormControl('')
  })
  forgotPasswor():void{
    let userEmail = this.forgotForm.value;
    this.email = userEmail.email
    this._ForgotPasswordService.forgotPassword(userEmail).subscribe({
      next:(res)=>{
        this.userMsg= res.message;
        this.step1=false
        this.step2=true
      },
      error:(err)=>{
        this.userMsg= err.error.message;
      },
    })
  }
  resetCode():void{
    let resetCode = this.resetCodeForm.value;
    this._ForgotPasswordService.resetCode(resetCode).subscribe({
      next:(res)=>{
        this.userMsg= res.status;
        this.step2=false
        this.step3=true
      },
      error:(err)=>{
        this.userMsg= err.error.message;
      },
    })
  }
  newPassword():void{
    let resetForm = this.resetPasswordForm.value;
    resetForm.email = this.email
    this._ForgotPasswordService.resetPassword(resetForm).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.token){
          localStorage.setItem('elToken',res.token);
          this._Router.navigate(['/home'])
        }
      },
      // error:(err)=>{
      //   this.userMsg= err.error.message;
      // },
    })
  }
}
