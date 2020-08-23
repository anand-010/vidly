import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  videos: Observable<any[]>;
  constructor(private apollo :Apollo) {
    
   }
   
   getOstypes(timemode:Number){
    return this.apollo.query({
      query: gql(`query osTypes($uid:String,$timemode:Int){
        osTypes(uid:$uid,timemode:$timemode){
          names
          value
        }
      }`),
      variables:{
        uid:"1234",
        timemode:timemode
      }

    })
   }

   getPlatformtypes(){
    return this.apollo.query({
      query: gql(`query platformTypes($uid:String,$timemode:Int){
        platformTypes(uid:$uid,timemode:$timemode){
          names
          value
        }
      }`),
      variables:{
        uid:"1234",
        timemode:1
      }

    })
   }
   getCountry(timemode:Number){
    return this.apollo.query({
      query: gql(`query countries($uid:String,$timemode:Int){
          countries(uid:$uid,timemode:$timemode){
            count
            country
          }
      }`),
      variables:{
        uid:"1234",
        timemode:timemode
      }

    })
   }
}
