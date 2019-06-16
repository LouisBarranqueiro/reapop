import {convertStatus} from '../../src/helpers'
import {INFO_STATUS, SUCCESS_STATUS, WARNING_STATUS, ERROR_STATUS} from '../../src/constants'

describe('convertStatus()', () => {
  it('should convert HTTP status code', () => {
    expect(convertStatus(100)).toEqual(INFO_STATUS)
    expect(convertStatus(101)).toEqual(INFO_STATUS)
    expect(convertStatus(200)).toEqual(SUCCESS_STATUS)
    expect(convertStatus(202)).toEqual(SUCCESS_STATUS)
    expect(convertStatus(204)).toEqual(SUCCESS_STATUS)
    expect(convertStatus(400)).toEqual(ERROR_STATUS)
    expect(convertStatus(404)).toEqual(ERROR_STATUS)
    expect(convertStatus(500)).toEqual(ERROR_STATUS)
    expect(convertStatus(500)).toEqual(ERROR_STATUS)
  })

  it('should let the status as it is', () => {
    expect(convertStatus(INFO_STATUS)).toEqual(INFO_STATUS)
    expect(convertStatus(301)).toEqual(301)
    expect(convertStatus(SUCCESS_STATUS)).toEqual(SUCCESS_STATUS)
    expect(convertStatus(WARNING_STATUS)).toEqual(WARNING_STATUS)
    expect(convertStatus(ERROR_STATUS)).toEqual(ERROR_STATUS)
    expect(convertStatus(1)).toEqual(1)
  })
})
