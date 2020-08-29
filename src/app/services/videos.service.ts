import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { variable } from '@angular/compiler/src/output/output_ast';

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

   }

   deleteVideo(id:String){
    return this.apollo.subscribe({
      query: gql(`mutation deleteVideo($id:String){
        deleteVideo(id:$id){
          status
        }
      }`),
      variables : {
        id
      }
    })
   }
}
