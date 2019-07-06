import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public spiner: boolean = true;
  public currentRoute: string;
  public filmDetails: boolean;
  public actorDetails: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.spiner = false;

    this.router.events.subscribe(
      (event: any) => {
        console.log(event);
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url; 
          console.log(this.currentRoute);
          this.showDetailCard(this.currentRoute);    
        }
      });
      

     
 
  }


  showDetailCard(route) {
    console.log(route);
    // this.filmDetails = (route === '/films/details') ? true : false;
    if (route === '/films/details') {
      this.filmDetails = true;
      console.log(this.filmDetails);
    } else {
      this.filmDetails = false;
      console.log(this.filmDetails);
    }

    // this.actorDetails = route === '/actors/details' ? true : false;
  }

  

}
