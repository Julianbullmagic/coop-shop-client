import { Component, OnInit } from '@angular/core';
import { CoopShopService } from "src/app/services/coop-shop.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public coopShopService: CoopShopService,private router: Router
) { }

  userModel = {email:'',password:''};
   submitted = false;
   errorMsg = '';
  ngOnInit(): void {
  }
 onSubmit() {
  this.submitted = true;
  let user={email:this.userModel.email,
    password:this.userModel.password}
console.log("user",user)
 this.coopShopService.login(user.email,user.password)
  .subscribe()
}}
