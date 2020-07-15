import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({transform: 'translateY(-10%)', opacity: 1}),
            animate(900)
        ]),
        transition('* => void', [
            animate(500, style({transform: 'translateY(-10%)', opacity : 0}))
        ])
    ])
]
})
export class HomeComponent implements OnInit {
  upload_show;
  isSelected =[];
  videos :any = [{name:"myvideo", duration : "1.5 min" ,src: "assets/img/Video-Thumbnails-sml-1280x995.55555555556-c-default.jpg",bitrate:'15000',views:'15k',size:'2.3MB'}];
  constructor(private socket : SocketService) { 
    this.upload_show = false;
  }

  ngOnInit(): void {
    this.socket.listen('videos').subscribe((data)=>{
      this.videos = data;
      console.log("os data, ",this.videos);
    })
    this.socket.listen('vid_update').subscribe((data)=>{
      this.videos.unshift(data);
      // this.videos = data;
      console.log("update , ",data);
    })
  }
    // test data
    getVid(){
      return this.videos;
    }
}
