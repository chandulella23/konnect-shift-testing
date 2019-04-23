import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';

@Injectable()
export class BaseService {
  headers: any;

  constructor(
  ) {
    this.headers = new Headers({ 'Content-Type': 'application/json'});
   }

  protected post() {
    return new RequestOptions({ headers: this.headers, method: 'post' });
  }

  protected get() {
    return new RequestOptions({ headers: this.headers });
  }

  protected put() {

    return new RequestOptions({ headers: this.headers, method: 'put' });
  }

  protected patch() {
    return new RequestOptions({ headers: this.headers, method: 'patch' });
  }

}
