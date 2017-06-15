import { FormsModule } from '@angular/forms';
import { Http, HttpModule, BaseRequestOptions, XHRBackend, RequestMethod, Response, ResponseOptions } from '@angular/http';

import { TestBed, async, fakeAsync, tick, getTestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { MathService } from './math.service';

import { AppComponent } from './app.component';

describe('AppComponent (Calculator)', () => {
  let mockBackend : MockBackend;
  let app, fixture;

  function mockBackendFunctions(testBed : TestBed) {
    mockBackend = testBed.get(MockBackend);
    mockBackend.connections.subscribe(
      (connection : MockConnection) => {
        const isAdd = connection.request.url &&
                      connection.request.method === RequestMethod.Post &&
                      connection.request.url == '/api/math/add';

        const isSubtract = connection.request.url &&
                      connection.request.method === RequestMethod.Post &&
                      connection.request.url == '/api/math/subtract';

        const isMultiply = connection.request.url &&
                      connection.request.method === RequestMethod.Post &&
                      connection.request.url == '/api/math/multiply';

        const isDivide = connection.request.url &&
                      connection.request.method === RequestMethod.Post &&
                      connection.request.url == '/api/math/divide';

        const postData = JSON.parse(connection.request.getBody());

        if (isAdd) {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: {
                result: postData.num1 + postData.num2,
              }
            })
          ));
        }

        if (isSubtract) {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: {
                result: postData.num1 - postData.num2,
              }
            })
          ));
        }

        if (isMultiply) {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: {
                result: postData.num1 * postData.num2,
              }
            })
          ));
        }

        if (isDivide) {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: {
                result: postData.num1 / postData.num2,
              }
            })
          ));
        }
      }
    )
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        MathService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backend, defaultOptions);
            }
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should display `8` as a result when `5` and `3` are inputted and the add button is clicked', fakeAsync(() => {
    const testBed = getTestBed();
    mockBackendFunctions(testBed);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    // Set the inputs
    app.num1 = 5;
    app.num2 = 3;

    // Click the add button 
    fixture.debugElement.nativeElement.querySelector('#addButton').click();

    // The click button activaters a promise, we use fakeAsync to simulate async happening
    tick();
    fixture.detectChanges();

    // Inner HTML should equal num1 + num2
    expect(fixture.nativeElement.querySelector('#results').innerHTML).toEqual('8');
  }));

  it('should display `-9` as a result when `45` and `-54` are inputted and the add button is clicked', fakeAsync(() => {
    const testBed = getTestBed();
    mockBackendFunctions(testBed);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    // Set the inputs
    app.num1 = 45;
    app.num2 = -54;

    // Click the add button 
    fixture.debugElement.nativeElement.querySelector('#addButton').click();

    // The click button activaters a promise, we use fakeAsync to simulate async happening
    tick();
    fixture.detectChanges();

    // Inner HTML should equal num1 + num2
    expect(fixture.nativeElement.querySelector('#results').innerHTML).toEqual('-9');
  }));

  it('should display `-32` as a result when `100` and `132` are inputted and the subtract button is clicked', fakeAsync(() => {
    const testBed = getTestBed();
    mockBackendFunctions(testBed);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    // Set the inputs
    app.num1 = 100;
    app.num2 = 132;

    // Click the subtract button 
    fixture.debugElement.nativeElement.querySelector('#subtractButton').click();

    // The click button activaters a promise, we use fakeAsync to simulate async happening
    tick();
    fixture.detectChanges();

    // Inner HTML should equal num1 - num2
    expect(fixture.nativeElement.querySelector('#results').innerHTML).toEqual('-32');
  }));

  it('should display `12` as a result when `-4` and `-16` are inputted and the subtract button is clicked', fakeAsync(() => {
    const testBed = getTestBed();
    mockBackendFunctions(testBed);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    // Set the inputs
    app.num1 = -4;
    app.num2 = -16;

    // Click the subtract button 
    fixture.debugElement.nativeElement.querySelector('#subtractButton').click();

    // The click button activaters a promise, we use fakeAsync to simulate async happening
    tick();
    fixture.detectChanges();

    // Inner HTML should equal num1 - num2
    expect(fixture.nativeElement.querySelector('#results').innerHTML).toEqual('12');
  }));

  it('should display `36` as a result when `12` and `3` are inputted and the multiply button is clicked', fakeAsync(() => {
    const testBed = getTestBed();
    mockBackendFunctions(testBed);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    // Set the inputs
    app.num1 = 3;
    app.num2 = 12;

    // Click the multiply button 
    fixture.debugElement.nativeElement.querySelector('#multiplyButton').click();

    // The click button activaters a promise, we use fakeAsync to simulate async happening
    tick();
    fixture.detectChanges();

    // Inner HTML should equal num1 * num2
    expect(fixture.nativeElement.querySelector('#results').innerHTML).toEqual('36');
  }));

  it('should display `-24` as a result when `-8` and `3` are inputted and the multiply button is clicked', fakeAsync(() => {
    const testBed = getTestBed();
    mockBackendFunctions(testBed);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    // Set the inputs
    app.num1 = -8;
    app.num2 = 3;

    // Click the multiply button 
    fixture.debugElement.nativeElement.querySelector('#multiplyButton').click();

    // The click button activaters a promise, we use fakeAsync to simulate async happening
    tick();
    fixture.detectChanges();

    // Inner HTML should equal num1 * num2
    expect(fixture.nativeElement.querySelector('#results').innerHTML).toEqual('-24');
  }));

  it('should display `8` as a result when `24` and `3` are inputted and the divide button is clicked', fakeAsync(() => {
    const testBed = getTestBed();
    mockBackendFunctions(testBed);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    // Set the inputs
    app.num1 = 24;
    app.num2 = 3;

    // Click the divide button 
    fixture.debugElement.nativeElement.querySelector('#divideButton').click();

    // The click button activaters a promise, we use fakeAsync to simulate async happening
    tick();
    fixture.detectChanges();

    // Inner HTML should equal num1 / num2
    expect(fixture.nativeElement.querySelector('#results').innerHTML).toEqual('8');
  }));

  it('should display `-5` as a result when `25` and `-5` are inputted and the divide button is clicked', fakeAsync(() => {
    const testBed = getTestBed();
    mockBackendFunctions(testBed);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    // Set the inputs
    app.num1 = 25;
    app.num2 = -5;

    // Click the divide button 
    fixture.debugElement.nativeElement.querySelector('#divideButton').click();

    // The click button activaters a promise, we use fakeAsync to simulate async happening
    tick();
    fixture.detectChanges();

    // Inner HTML should equal num1 / num2
    expect(fixture.nativeElement.querySelector('#results').innerHTML).toEqual('-5');
  }));
});
