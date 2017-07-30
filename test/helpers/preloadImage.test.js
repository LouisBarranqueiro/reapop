import {preloadImage} from '../../src/helpers';
import {imageUrl} from '../utils/fixtures';

describe('preloadImage', () => {
  it('should preload image', () => {
    const image = preloadImage(imageUrl, function() {
      return 1;
    });
    expect(image.nodeName.toLowerCase()).toEqual('img');
    expect(image.src).toEqual(imageUrl);
    expect(image.onload()).toEqual(1);
  });

  it('should preload image (call `onload` event)', (done) => {
    const spy = expect.createSpy();
    preloadImage(imageUrl, spy);
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    }, 1500);
  });

  it('should try to preload image: 404 (call `onerror` event)', (done) => {
    const spy = expect.createSpy();
    preloadImage('https://httpbin.org/status/404', spy);
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    }, 1500);
  });
});
