import { validate } from '../form-helper';

describe('FormHelper validate', () => {
  it('should return required message', () => {
    const message = 'required';
    let res = validate(undefined, { required: true, message });
    expect(res).toBe(message);

    res = validate('normal', { required: true });
    expect(res).toBe(undefined);
  });

  it('should return max message', () => {
    let message = 'max string';
    let res = validate('string', { max: 5, message });
    expect(res).toBe(message);

    // segment
    res = validate('string', { max: 6 });
    expect(res).toBe(undefined);

    message = 'max number';
    res = validate(11, { max: 10, message });
    expect(res).toBe(message);

    message = 'max array';
    res = validate([1, 2, 3, 4, 5], { max: 3, message });
    expect(res).toBe(message);
  });

  it('should return min message', () => {
    let message = 'min string';
    let res = validate('string', { min: 7, message });
    expect(res).toBe(message);

    // segment
    res = validate('string', { min: 6, message });
    expect(res).toBe(undefined);

    message = 'min number';
    res = validate(11, { min: 12, message });
    expect(res).toBe(message);

    message = 'min array';
    res = validate([1, 2, 3, 4, 5], { min: 6, message });
    expect(res).toBe(message);
  });

  it('should pass required check for 0', () => {
    expect(validate(0, { required: true })).toBe(undefined);
    expect(validate(false, { required: true })).toBe(undefined);
  });

  it('should fail required check for null, undefined, empty string', () => {
    expect(validate(null, { required: true })).toBe('The value is required');
    expect(validate(undefined, { required: true })).toBe('The value is required');
    expect(validate('', { required: true })).toBe('The value is required');
  });

  it('should use "less than the min" in default min message', () => {
    expect(validate(3, { min: 5 })).toBe('The value is less than the min');
    expect(validate('ab', { min: 5 })).toBe('The length of value is less than the min');
  });

  it('should fail sync validator returning false', () => {
    expect(validate('bad', { validator: () => false })).toBe(
      'The value is validated unsuccessfully'
    );
  });

  it('should pass sync validator returning true', () => {
    expect(validate('good', { validator: () => true })).toBe(undefined);
  });

  it('should return type message', () => {
    let message = 'number';
    let res = validate('10', { type: 'number', message });
    expect(res).toBe(message);

    res = validate(10, { type: 'number', message });
    expect(res).toBe(undefined);

    message = 'string';
    res = validate(10, { type: 'string', message });
    expect(res).toBe(message);

    res = validate('10', { type: 'string', message });
    expect(res).toBe(undefined);

    message = 'boolean';
    res = validate(10, { type: 'boolean', message });
    expect(res).toBe(message);

    res = validate('10', { type: 'boolean', message });
    expect(res).toBe(message);

    res = validate(true, { type: 'boolean', message });
    expect(res).toBe(undefined);

    res = validate(false, { type: 'boolean', message });
    expect(res).toBe(undefined);
  });
});
