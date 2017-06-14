import { TestBed, async, getTestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { Http, HttpModule, BaseRequestOptions, XHRBackend, RequestMethod, Response, ResponseOptions } from '@angular/http';
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

        console.log(connection);

        if (isAdd) {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: {
                result: 8,
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

  it('should display 8 when 5 and 3 are added', async(() => {
    const testBed = getTestBed();
    mockBackendFunctions(testBed);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    fixture.componentInstance.num1 = 5;
    fixture.componentInstance.num2 = 3;

    fixture.nativeElement.querySelector('#addButton').click();

    // process the click event
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#results').innerHTML == 8).toBe(true);
  }));
});
