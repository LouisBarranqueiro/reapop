import {Timer} from '../../src/helpers';

describe('Timer()', () => {
  it('should start and pause timer', (done) => {
    let time = 0;
    const timer = new Timer(20, () => {
    });
    // start timer
    timer.resume();
    // stop timer after 5s
    setTimeout(() => {
      timer.pause();
      time = timer.getTimeRemaining();
    }, 5);
    // check timer after 10s
    setTimeout(() => {
      // we add a short margin otherwise the test failed on Chrome
      expect(timer.getTimeRemaining()).toEqual(time);
      // resume timer
      timer.resume();
    }, 10);
    // stop timer after 15s
    setTimeout(() => {
      timer.pause();
      time = timer.getTimeRemaining();
    }, 15);
    // check timer after 20s
    setTimeout(() => {
      // we add a short margin otherwise the test failed on Chrome
      expect(timer.getTimeRemaining()).toEqual(time);
      done();
    }, 20);
  });

  it('should call callback at the end', (done) => {
    const timer = new Timer(10, () => {
      done();
    });
    timer.resume();
  });
});
