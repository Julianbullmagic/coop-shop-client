import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { Observable } from "rxjs";
import { CoopShopService } from "src/app/services/coop-shop.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
public view=true
public categories$:Observable<any[]>;
public categories=[]
public allcategories=[]
  constructor(public router:Router,private route: ActivatedRoute,
  public coopShopService: CoopShopService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log("params",params.searchTerm)
    if(params.searchTerm){
      this.view=false
  }
})
this.categories$=this.fetchCategories();
this.categories$.subscribe(item=>{
  item=item.filter(x => !!x.category);
  this.allcategories=item
  this.categories=item.slice(0,10)})
}

fetchCategories(): Observable<any[]> {
  return this.coopShopService.fetchAllCategories()
}

toggleallcategories(){
  console.log("clicking",this.allcategories)
  if(this.categories.length==10){
    this.categories=this.allcategories
  }else{
    this.categories=this.categories.slice(0,10)
  }
}
}
