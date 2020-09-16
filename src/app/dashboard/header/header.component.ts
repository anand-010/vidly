import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {HeaderService} from '../../services/header.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public info;
  constructor(private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.getInfo().subscribe((dt: any) => {
      this.info = dt.data.getuserInfo;
      console.log('data from info', this.info);
    });
  }
}
