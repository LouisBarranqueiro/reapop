import {expect} from 'chai';
import {convertStatus} from '../../src/helpers';
import {INFO_STATUS, SUCCESS_STATUS, WARNING_STATUS, ERROR_STATUS} from '../../src/constants';

describe('Helpers', () => {
  describe('convertStatus()', () => {
    it('should convert HTTP information status code', () => {
      expect(convertStatus(100)).to.equal(INFO_STATUS);
    });

    it('should convert HTTP success status code', () => {
      expect(convertStatus(200)).to.equal(SUCCESS_STATUS);
    });

    it('should convert HTTP error status code', () => {
      expect(convertStatus(500)).to.equal(ERROR_STATUS);
    });

    it('should let the status code as it is', () => {
      expect(convertStatus(INFO_STATUS)).to.equal(INFO_STATUS);
      expect(convertStatus(SUCCESS_STATUS)).to.equal(SUCCESS_STATUS);
      expect(convertStatus(WARNING_STATUS)).to.equal(WARNING_STATUS);
      expect(convertStatus(ERROR_STATUS)).to.equal(ERROR_STATUS);
      expect(convertStatus(400)).to.equal(400);
    });
  });
});
