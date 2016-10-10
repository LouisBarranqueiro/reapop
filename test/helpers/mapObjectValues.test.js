import {mapObjectValues} from '../../src/helpers';

describe('mapObjectValues()', () => {
  it('should map object values', () => {
    const obj = {
      a: 'a',
      'b-c': 'b',
      12: 12
    };
    expect(mapObjectValues(obj)).toEqual([12, 'a', 'b']);
  });
});
