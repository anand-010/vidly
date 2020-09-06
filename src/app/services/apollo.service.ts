import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  videos: Observable<any[]>;
  constructor(private apollo: Apollo) {}

  getOstypes(timemode: Number) {
    return this.apollo.query({
      query: gql(`query osTypes($timemode:Int){
        osTypes(timemode:$timemode){
          names
          value
        }
      }`),
      variables: {
        timemode: timemode,
      },
    });
  }

  getPlatformtypes() {
    return this.apollo.query({
      query: gql(`query platformTypes($timemode:Int){
        platformTypes(timemode:$timemode){
          names
          value
        }
      }`),
      variables: {
        timemode: 1,
      },
    });
  }
  getCountry(timemode: Number) {
    return this.apollo.query({
      query: gql(`query countries($timemode:Int){
          countries(timemode:$timemode){
            count
            country
          }
      }`),
      variables: {
        timemode: timemode,
      },
    });
  }
}
