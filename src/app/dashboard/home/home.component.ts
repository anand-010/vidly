import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { 

  }

  ngOnInit(): void {

  }
    // test data
    getVid(){
      return [{name:"myvideo", duration : "1.5 min" ,src: "assets/img/Video-Thumbnails-sml-1280x995.55555555556-c-default.jpg"},{name:"myvideo2", duration : "1.5 min" ,src: "assets/img/Video-Thumbnails-sml-1280x995.55555555556-c-default.jpg"},{name:"myvideo3", duration : "1.5 min" ,src: "assets/img/Video-Thumbnails-sml-1280x995.55555555556-c-default.jpg"}]
    }
}
