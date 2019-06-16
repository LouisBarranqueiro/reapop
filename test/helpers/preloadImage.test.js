import {preloadImage} from '../../src/helpers'
import {imageUrl} from '../utils/fixtures'

describe('preloadImage', () => {
  it('should preload image (callback registrations)', () => {
    const image = preloadImage(imageUrl, function() {
      return 1
    })
    expect(image.nodeName.toLowerCase()).toEqual('img')
    expect(image.src).toEqual(imageUrl)
    expect(image.onload()).toEqual(1)
    expect(image.onerror()).toEqual(1)
  })
})
