import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MathService {
  private apiUrl = '/api/math';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http) { }

  /*
    How HTTP calls work in this service:
    - Send a POST request to the corresponding API URL
    - Convert data to a JSON string and include it in the POST request
    - Convert request to a Promise (doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
    - When request is complete, convert the JSON data and return as another Promise
    - That returned Promise can then be used by components
  */

  // Send POST request to REST API and return a promise that will return the sum of two numbers
  addNumbers(_num1, _num2) {
    return this.http
      .post(this.apiUrl + '/add', 
            JSON.stringify({
              num1: _num1,
              num2: _num2
            }), 
            { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Send POST request to REST API and return a promise that will return the difference between two numbers
  subtractNumbers(_num1, _num2) {
    return this.http
      .post(this.apiUrl + '/subtract', 
            JSON.stringify({
              num1: _num1,
              num2: _num2
            }), 
            { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Send POST request to REST API and return a promise that will return the product of two numbers
  multiplyNumbers(_num1, _num2) {
    return this.http
      .post(this.apiUrl + '/multiply', 
            JSON.stringify({
              num1: _num1,
              num2: _num2
            }), 
            { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Send POST request to REST API and return a promise that will return the quotient of two numbers
  divideNumbers(_num1, _num2) {
    return this.http
      .post(this.apiUrl + '/divide', 
            JSON.stringify({
              num1: _num1,
              num2: _num2
            }), 
            { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // Handle potential errors (404, 503, etc)
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
