import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private filmsService: FilmService) { }

  ngOnInit() {
    this.filmsService.getItemsBySearch('kea').subscribe(
      (filmList: any) => {
        console.log(filmList); 
      },
      err => console.log("error", err)
    )
  }

}
