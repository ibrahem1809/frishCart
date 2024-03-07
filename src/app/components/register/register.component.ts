import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  errorMsg:string = '';
  loding:boolean=false;
  registerForm:FormGroup = new FormGroup ({
    name:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    rePassword:new FormControl(''),
    phone:new FormControl('', [Validators.required, Validators.pattern(/^{010|011|012|015}[0*9]{8}$/)])
  } , { validators:[this.cheekPassword] } as FormControlOptions)


  cheekPassword(group:FormGroup):void{
    let pass = group.get("password");
    let rePass = group.get("rePassword");

    if(rePass?.value == ''){
      rePass?.setErrors({required:true})
    }
    else if(pass?.value != rePass?.value){
      rePass?.setErrors({mismatch:true})
    }
  }
  handleForm():void{
    let userData = this.registerForm.value;
    this.loding=true;
    if(this.registerForm.valid == true){
      this._AuthService.rejester(userData).subscribe({
        next: (response) =>{
          console.log(response);
          if(response.message === "success"){
            this._Router.navigate(["/login"])
            this.loding=false;
          }
        },
        error: (error)=>{
          this.errorMsg = 'Error : ' + error.error.message ;
          this.loding=false;
        }
      })
    }
  }
}
