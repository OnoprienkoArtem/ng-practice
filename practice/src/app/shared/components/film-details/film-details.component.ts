import { Component, OnInit, Input, Inject } from '@angular/core';
import { LOCAL_CONFIG } from '../../../config/config-api';
import { ApiConfig } from '../../../models/api';
import { Location } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit {

  public imgUrl: string = this.localConfig.midImgPath;
  public midBackPath: string = this.localConfig.midBackPath;
  public smallImgPath: string = this.localConfig.smallImgPath;
  public mode = 'determinate';


  @Input('data') film: any;


  public youtubePath: string = 'https://www.youtube.com/embed/';

  constructor(
    @Inject(LOCAL_CONFIG) public localConfig: ApiConfig,
    private _location: Location,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    console.log(this.film);

    this.film.people.cast.map(item => {
      // console.log(item.id);


    })
  }

  backOnAllActor() {
    this._location.back();
  }

}
