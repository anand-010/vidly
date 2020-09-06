import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SocketService } from 'src/app/services/socket.service';
import { VideosService } from 'src/app/services/videos.service';
import * as Dropzone from 'dropzone';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CodepopupComponent } from '../codepopup/codepopup.component';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('panelInOut', [
      transition('0 => 1', [
        style({ transform: 'translateY(-10%)', opacity: 1 }),
        animate(900),
      ]),
      transition('1 => 0', [
        animate(500, style({ transform: 'translateY(-10%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  upload_show;
  isSelected = [];
  videoList = [];
  videos: any = [
    {
      name: 'myvideo',
      duration: '1.5 min',
      src: 'assets/img/Video-Thumbnails-sml-1280x995.55555555556-c-default.jpg',
      bitrate: '15000',
      views: '15k',
      size: '2.3MB',
    },
  ];
  constructor(
    private socket: SocketService,
    private videoservice: VideosService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.upload_show = false;
  }
  ngOnInit(): void {
    // this.socket.listen('videos').subscribe((data)=>{
    //   this.videos = data;
    //   console.log("os data, ",this.videos);
    // })
    // this.socket.listen('vid_update').subscribe((data)=>{
    //   this.videos.unshift(data);
    //   // this.videos = data;
    //   console.log("update , ",data);
    // })

    this.videoservice.getVideos().subscribe((viddata: any) => {
      console.log(viddata);
      this.videos = viddata.data.subscribeVideos;
      // this.videos = viddata.map(m=>{
      //   return {name:m.Key, duration : m.format.duration ,src: "assets/img/Video-Thumbnails-sml-1280x995.55555555556-c-default.jpg",bitrate:m.format.bit_rate,views:'15k',size: m.format.size , status:m.status}
      // })
    });

    // dropzone test
    var dropzone = new Dropzone('#demo-upload', {
      withCredentials: true,
      acceptedFiles: 'video/mp4,video/avi,video/mkv',
      paramName: 'userParamName',
      method: 'post',
      parallelUploads: 2,
      thumbnailHeight: 120,
      thumbnailWidth: 120,
      maxFilesize: 500,
      filesizeBase: 1000,
      thumbnail: function (file, dataUrl) {
        if (file.previewElement) {
          file.previewElement.classList.remove('dz-file-preview');
          var images = file.previewElement.querySelectorAll(
            '[data-dz-thumbnail]'
          );
          for (var i = 0; i < images.length; i++) {
            var thumbnailElement: any = images[i];
            thumbnailElement.alt = file.name;
            thumbnailElement.src = dataUrl;
          }
          setTimeout(function () {
            file.previewElement.classList.add('dz-image-preview');
          }, 1);
        }
      },
    });
  }
  // test data
  getVid() {
    return this.videos;
  }

  deleteVid(id: String) {
    console.log('id is', id);

    this.videoservice.deleteVideo(id).subscribe((val) => {
      console.log(val);
    });
  }
  notify(payload: string) {
    // Might want to notify the user that something has been pushed to the clipboard
    console.info(`'${payload}' has been copied to clipboard`);
    this._snackBar.open('Link Copied', 'Ok', {
      duration: 2000,
      panelClass: 'text-success',
    });
  }
  openDialog(video: any) {
    console.log('indie open dialog');

    const dialogRef = this.dialog.open(CodepopupComponent, {
      data: video,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
