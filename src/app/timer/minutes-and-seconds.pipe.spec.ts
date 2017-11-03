import { MinutesAndSecondsPipe } from './minutes-and-seconds.pipe';

describe('MinutesAndSecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new MinutesAndSecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
