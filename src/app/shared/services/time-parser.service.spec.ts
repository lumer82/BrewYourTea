import { TestBed, inject } from '@angular/core/testing';

import { TimeParserService } from './time-parser.service';

describe('TimeParserService', () => {
  let service: TimeParserService;
  beforeEach(() => {
    service = new TimeParserService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse 5 to 300 seconds', () => {
    expect(service.parseTime('5')).toEqual(300);
  });

  it('should parse 3minutes to 180 seconds', () => {
    expect(service.parseTime('3minutes')).toEqual(180);
  });

  it('should parse 2 minutes to 120 seconds', () => {
    expect(service.parseTime('2 minutes')).toEqual(120);
  });

  it('should parse 4 m to 240 seconds', () => {
    expect(service.parseTime('4 m')).toEqual(240);
  });

  it('should parse 3:20 to 200 seconds', () => {
    expect(service.parseTime('3:20')).toEqual(200);
  });

  it('should parse 3 minutes 40 seconds to 220 seconds', () => {
    expect(service.parseTime('3 minutes 40 seconds')).toEqual(220);
  });

    it('should parse 40s to 40 seconds', () => {
      expect(service.parseTime('40s')).toEqual(40);
    });

    it('should parse 50 seconds to 50 seconds', () => {
      expect(service.parseTime('50 seconds')).toEqual(50);
    });
});
