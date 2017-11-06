import { MinutesAndSecondsPipe } from './minutes-and-seconds.pipe';

describe('MinutesAndSecondsPipe', () => {

  let pipe: MinutesAndSecondsPipe;
  beforeEach(() => {
    pipe = new MinutesAndSecondsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should show zero seconds', () => {
    expect(pipe.transform(300)).toEqual('5 minutes 0 seconds');
  });

  it('should not show zero seconds', () => {
    expect(pipe.transform(300, false)).toEqual('5 minutes');
  });

  it('should use correct singular', () => {
    expect(pipe.transform(61)).toEqual('1 minute 1 second');
  });
});
