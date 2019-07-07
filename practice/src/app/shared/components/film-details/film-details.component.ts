import { Component, OnInit, Input, Inject } from '@angular/core';
import { LOCAL_CONFIG } from '../../../config/config-api';
import { ApiConfig } from '../../../models/api';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit {

  public imgUrl: string = this.localConfig.midImgPath; 
  public midBackPath: string = this.localConfig.midBackPath; 
  public smallImgPath: string = this.localConfig.smallImgPath;
   
  @Input('data') film: any;

  constructor(@Inject(LOCAL_CONFIG) public localConfig: ApiConfig) {
    
   
  }

  ngOnInit() {

    
  }

}
