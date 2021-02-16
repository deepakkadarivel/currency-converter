import { restrictToNumber, formatNumber } from '@/utils/formatter';

it('Restict values to contain only valid numbers', () => {
  expect(restrictToNumber('1234')).toEqual('1234');
  expect(restrictToNumber('1234abc')).toEqual('1234');
  expect(restrictToNumber('abc')).toEqual('');
  expect(restrictToNumber('1234.1200')).toEqual('1234.1200');
  expect(restrictToNumber('$123')).toEqual('123');
  expect(restrictToNumber('123e10')).toEqual('12310');
})

it('Format value to number with max 4 decimal places', () => {
  expect(formatNumber('1234.6789012')).toEqual(1234.6789);
  expect(formatNumber('1234')).toEqual(1234);
  expect(formatNumber('1234.000')).toEqual(1234);
  expect(formatNumber('1234.20')).toEqual(1234.2);
})