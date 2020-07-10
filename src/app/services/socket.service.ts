import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
  import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket : any;
  readonly url : String = "http://localhost";
  constructor() { 
    this.socket = io(this.url);
  }
  listen(eventName){
    return new Observable((subscriber)=>{
      this.socket.on(eventName, (data)=>{
        subscriber.next(data);
      })
    })
  }
  emit(eventName, data){
    this.socket.emit(eventName, data);
  }
}
