import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login_form;
  constructor(public auth: AuthService,private formBuilder: FormBuilder, private router: Router) {
    this.login_form = {
      email :'',
      password:''
    }
   }

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
  // setTimeout(()=>{
  //   // this.login();
  //   this.SignUp('anands9288907423@outlook.com','852456');
  // },5000)
  // setTimeout(()=>{
  //   // this.login();
  //   this.SignIn('anands9288907423@outlook.com','852456');
  // },10000)

  // this.login_form = this.formBuilder.group({
  //   email: '',
  //   password: ''
  // });
  }

async LoginContinue(){
  console.log(this.login_form);
  try {
    let result: any = await this.auth.SignIn(this.login_form.mail, this.login_form.password);
    if (result.isInfoEntered){
      this.router.navigate(['/dashboard/home']);
    }
    else {
      this.router.navigate(['/info']);
    }
  } catch (error) {
    throw error;
  }

}
// createCookie(name:string, value:string, days:number) {
//   var expires;

//   if (days) {
//       var date = new Date();
//       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//       expires = "; expires=" + date.toUTCString();
//   } else {
//       expires = "";
//   }
//   document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
// }

// readCookie(name:string) {
//   var nameEQ = encodeURIComponent(name) + "=";
//   var ca = document.cookie.split(';');
//   for (var i = 0; i < ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) === ' ')
//           c = c.substring(1, c.length);
//       if (c.indexOf(nameEQ) === 0)
//           return decodeURIComponent(c.substring(nameEQ.length, c.length));
//   }
//   return null;
// }

// eraseCookie(name:string) {
//   this.createCookie(name, "", -1);
// }
}
