import { Component,OnInit,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
@Input() storepage: boolean;
searchModel={search:'',storeorlisting:'',id:0,category:''}

  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    console.log(this.storepage)
     this.route.params.subscribe(params => {
       if (params.searchTerm)
         this.searchModel.search = params.searchTerm;

         if (params.storeOrListing)
           this.searchModel.storeorlisting = params.storeOrListing;

           if (params.id)
             this.searchModel.id = params.id;

             if (params.category)
               this.searchModel.category = params.category;
     })

   }

  onSubmit() {
console.log("SEARCHMODEL IN SEARCH COMP",this.searchModel)
    if(!this.searchModel.category){
      if(this.searchModel.search){
          this.router.navigateByUrl('/home/search/' + this.searchModel.search + '/' + this.searchModel.storeorlisting);
      }
      if(this.searchModel.id){
        this.router.navigateByUrl('/singlestore/' + this.searchModel.id + '/' + this.searchModel.search)
      }
    }else{
      if(this.searchModel.search){
          this.router.navigateByUrl('/home/categorysearch/'+ this.searchModel.category + "/" + this.searchModel.search + '/' + this.searchModel.storeorlisting);
      }
      if(this.searchModel.id){
        this.router.navigateByUrl('/singlestore/categorysearch/' + this.searchModel.id + '/' + this.searchModel.category+ '/' + this.searchModel.search)
      }
    }

}


}
