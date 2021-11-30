import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CoopShopService } from "src/app/services/coop-shop.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated=false
  isCool=false
  token
  constructor(public router:Router,private route: ActivatedRoute,public coopShopService: CoopShopService) {}

  ngOnInit():void{


    this.token=localStorage.getItem('token')
    if (this.token){
      this.isAuthenticated=true
    }
    if (!this.token){
      this.isAuthenticated=false
    }

    let coo=localStorage.getItem('cool')
    let num=Number(coo)
    let boo=Boolean(coo)
    this.isCool=boo
    console.log("COOL",boo)
  }

  logout():void{
    localStorage.removeItem("token");
    localStorage.removeItem("cool");
    localStorage.removeItem("userid");

    this.router.navigate(["home"]).then(() => {
    window.location.reload();
  });
  }

}
