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
  public filmDetails: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.spiner = false;

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;          
          if (this.currentRoute === '/films/details') {
            this.filmDetails = false;
          }
        }
      });
 
  }

}
