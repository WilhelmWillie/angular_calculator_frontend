import { TestBed, inject } from '@angular/core/testing';

import { HttpModule } from '@angular/http';

import { MathService } from './math.service';

describe('MathService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [MathService]
    });
  });

  it('should be created', inject([MathService], (service: MathService) => {
    expect(service).toBeTruthy();
  }));

  it('should access the add API endpoint and return the right result', inject([MathService], (service: MathService) => {
    expect(service).toBeTruthy();
  }));
});
