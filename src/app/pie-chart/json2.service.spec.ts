import { TestBed } from '@angular/core/testing';

import { Json2Service } from './json2.service';

describe('Json2Service', () => {
  let service: Json2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Json2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
