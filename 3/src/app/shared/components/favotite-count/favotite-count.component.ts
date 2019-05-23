import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favotite-count',
  templateUrl: './favotite-count.component.html',
  styleUrls: ['./favotite-count.component.css']
})
export class FavotiteCountComponent implements OnInit {  

  @Input('favotite') countFavorite;

  constructor() { }



  ngOnInit() {
  }

}
