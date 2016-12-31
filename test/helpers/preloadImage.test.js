import {preloadImage} from '../../src/helpers';

describe('preloadImage', () => {
  it('should preload image', () => {
    const url = 'http://placehold.it/40x40';
    const image = preloadImage(url, function() {
      return 1;
    });
    expect(image.nodeName.toLowerCase()).toEqual('img');
    expect(image.src).toEqual(url);
    expect(image.onload()).toEqual(1);
  });

  it('should preload image (call `onload` event)', (done) => {
    const spy = expect.createSpy();
    preloadImage('http://placehold.it/40x40', spy);
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    }, 1000);
  });
});
