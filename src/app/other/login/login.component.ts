import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Auth } from '@aws-amplify/auth'; 
import { from } from 'rxjs';
import awsmobile from 'src/aws-exports';

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
    Auth.configure(awsmobile);
    Auth.currentUserInfo().then((info)=>{
      console.log("user info",info); 
    }).catch((err)=>{
      console.log(err);
      
    })
    
    // this.signUp();
  }
  async signUp() {
    try {
        const user = await Auth.signUp({
            username : "anands9288907423@gmail.com",
            password : "Anands@12345",
            attributes: {
                email : "anands9288907423@gmail.com",          // optional
                phone_number : "+919288907423",   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log({ user });
    } catch (error) {
        console.log('error signing up:', error);
    }
}
async confirmSignUp(username:string, code:string) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}
async SignIn(username:string, password:string) {
  try {
      const user = await Auth.signIn(username, password);
  } catch (error) {
      console.log('error signing in', error);
  }
}
async resendConfirmationCode(username:string) {
    try {
        await Auth.resendSignUp(username);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
}
async signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
}
