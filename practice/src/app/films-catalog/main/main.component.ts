import { Component, OnInit, Inject } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { Actor } from '../../models/actor';
import { LOCAL_CONFIG } from '../../config/config-api';
import { ApiConfig } from '../../models/api';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public spiner: boolean = true;
  public imgUrl: string = this.localConfig.midImgPath; 
  public films: Film[] = [];
  public filmsClone: any[] = [];
  public actors: Actor[] = [];
  private actorsClone: any[] = [];

  constructor(private filmsService: FilmService, @Inject(LOCAL_CONFIG) public localConfig: ApiConfig) { }

  ngOnInit() {

    this.filmsService.getToken().subscribe(
      (token: any) => {
        console.log('token', token);
        console.log('request_token', token.request_token);

        this.filmsService.bindingTokenWithAccount(token.request_token).subscribe(
          res => console.log(res)
        );

        this.filmsService.getSession(token.request_token).subscribe(
          (session: any) => {
            console.log(session);

            this.filmsService.getUserData(session.session_id).subscribe(
              (user: any) => {
                console.log(user);

                this.filmsService.addFilmToFavorite(user.id, session.session_id, "movie", 351286, true).subscribe(
                  res => {
                    console.log(res);
                  }
                );
              }
            );            
          }
        );

      }
    ),



    this.filmsService.getPopularFilms().subscribe(
      (filmList: any) => {
        this.filmsClone = filmList.results;
        this.films = this.filmsClone.slice(0, 6);  
        if (this.filmsClone) {
          this.spiner = false;
        }
      },
      err => console.log("error", err)
    ),
    
      this.filmsService.getPopularActors().subscribe(
        (actorsList: any) => {
          this.actorsClone = actorsList.results;
          this.actors = this.actorsClone.slice(0, 6);
          if (this.actorsClone) {
          this.spiner = false;
        }
      },
      err => console.log("error", err)
    )
  }

}
