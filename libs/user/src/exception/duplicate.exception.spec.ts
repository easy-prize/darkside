import { DuplicateException } from './duplicate.exception';

describe('DuplicateException', () => {
  it('should throw exception', () => {
    expect(() => {
      throw new DuplicateException('Hello');
    }).toThrowError('Hello');
  });

  it('should use default message when message is falsy', () => {
    expect(() => {
      throw new DuplicateException();
    }).toThrowError('Conflict');
  });
});
