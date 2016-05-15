import {Timer} from '../../src/helpers';

describe('Timer()', () => {
  it('should start and pause timer', (done) => {
    const timer = new Timer(() => {
    }, 20);
    // start timer
    timer.resume();
    // stop timer after 5s
    setTimeout(() => {
      timer.pause();
    }, 5);
    // check timer after 10s
    setTimeout(() => {
      expect(timer.getTimeRemaining() < 16).toEqual(true);
      expect(timer.getTimeRemaining() >= 14).toEqual(true);
      // resume timer
      timer.resume();
    }, 10);
    // stop timer after 15s
    setTimeout(() => {
      timer.pause();
    }, 15);
    // check timer after 20s
    setTimeout(() => {
      expect(timer.getTimeRemaining() < 11).toEqual(true);
      expect(timer.getTimeRemaining() >= 9).toEqual(true);
      done();
    }, 20);
  });

  it('should call callback at the end', (done) => {
    const timer = new Timer(() => {
      done();
    }, 10);
    timer.resume();
  });
});
