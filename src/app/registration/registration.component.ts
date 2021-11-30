import { Component, OnInit } from '@angular/core';
import { CoopShopService } from "src/app/services/coop-shop.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(public coopShopService: CoopShopService) { }

  userModel ={name:'',
  email:'',
  phone:0,
  bio:'',
  passiveincome:false,
  politician:false,
  executive:false,
  lawyer:false,
  password:'',
  confirmpassword:''}
  topicHasError=false
   submitted = false
   errorMsg = '';
  ngOnInit(): void {
  }

  validateTopic(value) {
     if (value === 'default') {
       this.topicHasError = true;
     } else {
       this.topicHasError = false;
     }
   }

   onSubmit() {
     this.submitted = true;
     let cool=true
     if(this.userModel.password==this.userModel.confirmpassword){
     if(this.userModel.passiveincome){
       cool=false
     }
     if(this.userModel.politician){
       cool=false
     }
     if(this.userModel.executive){
       cool=false
     }
     if(this.userModel.lawyer){
       cool=false
     }
     let newuser={name:this.userModel.name,email:this.userModel.email,phone:this.userModel.phone,
     bio:this.userModel.bio,cool:cool,password:this.userModel.password}
console.log("user",newuser)
    this.coopShopService.register(newuser)
     .subscribe(
       response => console.log('Success!', response),
     )
   }
   }
}
