describe('convertStatus()', () => {
  it('should convert HTTP status code', () => {
    expect(convertStatus(100)).to.equal(INFO_STATUS);
    expect(convertStatus(101)).to.equal(INFO_STATUS);
    expect(convertStatus(200)).to.equal(SUCCESS_STATUS);
    expect(convertStatus(202)).to.equal(SUCCESS_STATUS);
    expect(convertStatus(204)).to.equal(SUCCESS_STATUS);
    expect(convertStatus(400)).to.equal(ERROR_STATUS);
    expect(convertStatus(404)).to.equal(ERROR_STATUS);
    expect(convertStatus(500)).to.equal(ERROR_STATUS);
    expect(convertStatus(500)).to.equal(ERROR_STATUS);
  });

  it('should let the status as it is', () => {
    expect(convertStatus(INFO_STATUS)).to.equal(INFO_STATUS);
    expect(convertStatus(301)).to.equal(301);
    expect(convertStatus(SUCCESS_STATUS)).to.equal(SUCCESS_STATUS);
    expect(convertStatus(WARNING_STATUS)).to.equal(WARNING_STATUS);
    expect(convertStatus(ERROR_STATUS)).to.equal(ERROR_STATUS);
    expect(convertStatus(1)).to.equal(1);
  });
});
