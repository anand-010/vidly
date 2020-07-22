import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  videos: Observable<any[]>;
  constructor(private auth: AuthService,private firestore:AngularFirestore) {
    
   }
   
   async getVideos(){
      let uid = await this.auth.getuserId();
      this.videos = this.firestore.collection('Users').doc(uid).collection('Videos').valueChanges();
      return this.videos;
    // TODO need to done something else
   }
}
