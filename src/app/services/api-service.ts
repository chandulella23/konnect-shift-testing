import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, RequestOptions } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BaseService } from './base-service';
import * as io from 'socket.io-client';

@Injectable()
export class ApiService extends BaseService {

  constructor(public http: Http) {
    super();
  }
  private socket = io('http://localhost:3000');

  getFleets(): Observable<any> {
    return this.http.get('https://localhost:3000/api/v1/getFleets', this.get())
      .pipe(map(res => res.json()),
        catchError(err => throwError(err)));
  }

  userLocationChanged() {
    let observable = new Observable<{ latitude: Number, longitude: Number }>(observer => {
      this.socket.on('user location chnaged', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  trackUserLocation(data) {
    this.socket.emit('trackUserLocation',data);
  }
}
