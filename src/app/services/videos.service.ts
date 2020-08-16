import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  videos: Observable<any[]>;
  constructor(private apollo :Apollo) {
    
   }
   
   getVideos(){
    return this.apollo.subscribe({
      query: gql(`subscription {
        subscribeVideos(uid:"1234"){
          path
          playlist
          name
          transcoded_at
          status
          id
          uid
          duration
          bitrate
          context
          uploaded_at
          thumbnail
        }
      }`)
    })
    // .subscribe(val=>{
    //   console.log('value ', val);
    // })
   }
}
