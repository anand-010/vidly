import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private apollo: Apollo) {}
  getInfo() {
    return this.apollo.subscribe({
      query: gql(`query{
        getuserInfo{
          infoid
          profilePic
          cmpname
          cmploc
          sector
          website
          package
          uid
        }
      }`),
    });
  }
}
