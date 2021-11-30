import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { CoopShopService } from "src/app/services/coop-shop.service";
import { Listing } from "src/app/models/Listing";
import { Observable } from "rxjs";

@Component({
  selector: 'app-singlelisting',
  templateUrl: './singlelisting.component.html',
  styleUrls: ['./singlelisting.component.scss']
})
export class SinglelistingComponent implements OnInit {
  public listings$: Observable<Listing[]>;
  public identity;
  public imageObject: Array<object>
  public imagesarray:any
  constructor(public coopShopService: CoopShopService,public router:Router,private route: ActivatedRoute) { }


  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'))
    let id=this.route.snapshot.paramMap.get('id')
    this.identity=Number(id)
    console.log("identity",this.identity)
    this.listings$=this.fetchListing(this.identity);
    this.listings$.subscribe(item=>{
      console.log("listing",item)
    this.imagesarray=item.map(thing=>thing.images.split(','))
    this.imagesarray=this.imagesarray[0]
    console.log(this.imagesarray)
    this.imageObject=this.imagesarray.map(thing=>{return {
          image: thing,
          thumbImage: thing,
          alt: 'image',
          title: 'image'
      }})
  })
  }

  fetchListing(id:number): Observable<Listing[]> {
    return this.coopShopService.fetchListing(id)
  }

}
