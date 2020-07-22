import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({
              opacity:1
            }),
            animate(800)
        ]),
        transition('* => void', [
            animate(800, style({
              opacity:0
            }))
        ])
    ])
]
})
export class InfoComponent implements OnInit {
  step:any;
  image:string;
  constructor() { 
    this.step =1;
    this.image = 'assets/img/profile.jpg'
  }

  ngOnInit(): void {
  }
  incStep(){
    this.step = this.step+1;
  }
  decStep(){
    this.step = this.step-1;
  }

}
