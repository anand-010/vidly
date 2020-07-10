import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { from } from 'rxjs';
// map imports

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private socket : SocketService) { 

  }

  ngOnInit(): void {
    this.socket.listen('test').subscribe((data)=>{
      console.log("data, ",data);
      this.socket.emit('update',data);
    })
  }
  getOschart(){
    this.socket.listen('os').subscribe((data)=>{
      console.log("data, ",data);
      return data;
    })
  }
  getGraph(){
    this.socket.listen('graph').subscribe((data)=>{
      console.log("data, ",data);
      return data;
    })
  }
  getVideos(){
    this.socket.listen('videos').subscribe((data)=>{
      console.log("videos, ",data);
      return data;
    })
  }
  // test data
  getVid(){
    return [{name:"myvideo", duration : "1.5 min" ,src: "assets/img/Video-Thumbnails-sml-1280x995.55555555556-c-default.jpg"},{name:"myvideo2", duration : "1.5 min" ,src: "assets/img/Video-Thumbnails-sml-1280x995.55555555556-c-default.jpg"},{name:"myvideo3", duration : "1.5 min" ,src: "assets/img/Video-Thumbnails-sml-1280x995.55555555556-c-default.jpg"}]
  }
 chart_data = '{"type":"doughnut","data":{"labels":["Direct","Social","Referral"],"datasets":[{"label":"","backgroundColor":["#4e73df","#1cc88a","#36b9cc"],"borderColor":["#ffffff","#ffffff","#ffffff"],"data":["50","30","15"]}]},"options":{"maintainAspectRatio":false,"legend":{"display":false},"title":{}}}';
}
