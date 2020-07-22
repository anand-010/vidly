import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SocketService } from 'src/app/services/socket.service';
import { VideosService } from 'src/app/services/videos.service';
import * as Dropzone from 'dropzone';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('panelInOut', [
        transition('0 => 1', [
            style({transform: 'translateY(-10%)', opacity: 1}),
            animate(900)
        ]),
        transition('1 => 0', [
            animate(500, style({transform: 'translateY(-10%)', opacity : 0}))
        ])
    ])
]
})
export class HomeComponent implements OnInit {
  upload_show;
  isSelected =[];
  videoList = [];
  videos :any = [{name:"myvideo", duration : "1.5 min" ,src: "assets/img/Video-Thumbnails-sml-1280x995.55555555556-c-default.jpg",bitrate:'15000',views:'15k',size:'2.3MB'}];
  constructor(private socket : SocketService,private videoservice:VideosService) { 
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

    this.videoservice.getVideos().then((data)=>{
      data.subscribe(viddata=>{
        console.log(viddata);
        this.videos = viddata.map(m=>{
          return {name:m.Key, duration : m.format.duration ,src: "assets/img/Video-Thumbnails-sml-1280x995.55555555556-c-default.jpg",bitrate:m.format.bit_rate,views:'15k',size: m.format.size , status:m.status}
        })
        
      })
      
    });

    // dropzone test
    var dropzone = new Dropzone('#demo-upload', {
      withCredentials: true,
      acceptedFiles: "video/mp4,video/avi,video/mkv",
      paramName: 'paramNameForSend',
      method: 'post',
      parallelUploads: 2,
      thumbnailHeight: 120,
      thumbnailWidth: 120,
      maxFilesize: 500,
      filesizeBase: 1000,
      thumbnail: function(file, dataUrl) {
          if (file.previewElement) {
              file.previewElement.classList.remove("dz-file-preview");
              var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
              for (var i = 0; i < images.length; i++) {
                  var thumbnailElement:any = images[i];
                  thumbnailElement.alt = file.name;
                  thumbnailElement.src = dataUrl;
              }
              setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
          }
      }

  });
  }
    // test data
    getVid(){
      return this.videos;
    }
}
