import { FormsModule } from '@angular/forms';
import { Http, HttpModule, BaseRequestOptions, XHRBackend, RequestMethod, Response, ResponseOptions } from '@angular/http';

import { TestBed, async, getTestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { MathService } from './math.service';

import { AppComponent } from './app.component';

describe('AppComponent (Calculator)', () => {
  let mockBackend : MockBackend;

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

  function mockBackendFunctions(testBed : TestBed) {
    mockBackend = testBed.get(MockBackend);
    mockBackend.connections.subscribe(
      (connection : MockConnection) => {
        const isAdd = connection.request.url &&
                      connection.request.method === RequestMethod.Post &&
                      connection.request.url == '/api/math/add';

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
      }
    )
  }

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should display 8 when 5 and 3 are inputted and the add button is clicked', async(() => {
    const testBed = getTestBed();
    mockBackendFunctions(testBed);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.num1 = 5;
    app.num2 = 3;

    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#addButton');
    button.click();

    fixture.detectChanges();
    expect(app.num1 + app.num2).toEqual(8);
  }));
});
