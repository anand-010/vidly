import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,  private http: HttpClient) { }
  async login() {
    // this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    try {
      let result = await this.auth.signInWithEmailAndPassword('anands9288907423@gmail.com','852456');
      console.log('result login', result);
      
    } catch (error) {
      console.log('catch',error);
    }
  }
  logout() {
    this.auth.signOut();
  }
 // Send email verfificaiton when new user sign up
 async SendVerificationMail() {
  return (await this.auth.currentUser).sendEmailVerification()
  .then(() => {
    window.alert('varification mail send');
  })
}

  // Sign up with email/password
  SignUp(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail(); // Sending email verification notification, when new user registers
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        if (result.user.emailVerified !== true) {
          this.SendVerificationMail();
          window.alert('Please validate your email address. Kindly check your inbox.');
        } else {
          // this.ngZone.run(() => {
          //   this.router.navigate(['<!-- enter your route name here -->']);
          // });
          let User = await this.auth.currentUser;
          let Token:string = await User.getIdToken();
          console.log(" i think loged in ", Token);
          // Simple POST request with a JSON body and response type <any>
          this.http.post<any>('http://localhost/login', { Token: Token }, { withCredentials:true }).subscribe(data => {
            console.log("response from server", data);
            // if (data.mgs==='Continue') {
            //   this.createCookie('ohgod',data.cookie,30)
            // }
            
        })
        //   $.ajax({
        //     url : 'http://localhost/login',
        //     method : "POST",
        //     data : {Token:Token},
        //     dataType : 'text',
        //     contentType: 'application/json',
        //     success : function(data) {
        //         console.log("yeeeii",data)
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         $(".error").html(textStatus);
        //     }
        // });
        }
        // this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  async getuserId(){
    return (await this.auth.currentUser).uid;
  }
}
