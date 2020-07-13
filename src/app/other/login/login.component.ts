import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $(".veen .rgstr-btn button").click(function() {
          $('.veen .wrapper').addClass('move');
          $('.body').css('background', '#e0b722');
          $(".veen .login-btn button").removeClass('active');
          $(this).addClass('active');
  
      });
      $(".veen .login-btn button").click(function() {
          $('.veen .wrapper').removeClass('move');
          $('.body').css('background', '#ff4931');
          $(".veen .rgstr-btn button").removeClass('active');
          $(this).addClass('active');
      });
  });
  }

}
