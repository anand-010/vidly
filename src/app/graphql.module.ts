import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws/lib/webSocketLink';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {

      // Create an http link:
      const http = httpLink.create({
        uri: uri,
        withCredentials:true
      });

      // Create a WebSocket link:
      const ws = new WebSocketLink({
        uri: `ws://localhost:4000/graphql`,
        options: {
          reconnect: true
        }
      });
  
      // using the ability to split links, you can send data to each link
      // depending on what kind of operation is being sent
      const link = split(
        // split based on operation type
        ({ query }) => {
          const { kind, operation }: Definintion = getMainDefinition(query);
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        ws,
        http,
      );

  return {
    link: link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

interface Definintion {
  kind: string;
  operation?: string;
};
