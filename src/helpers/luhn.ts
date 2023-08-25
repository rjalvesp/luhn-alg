import * as R from 'ramda';

export const checkUsingLuhnAlg = (n: string): boolean => {
  const number = R.dropLast(1, n);
  const check = R.takeLast(1, n);

  const calculatedCheck = R.pipe(
    R.split(''),
    (digits: string[]) =>
      digits.map((digit, index) => {
        const intNumber = parseInt(digit, 10);
        if (R.not(index % 2)) {
          return intNumber;
        }
        return R.pipe(
          R.map((value: string) => parseInt(value, 10)),
          R.sum,
        )(`${intNumber * 2}`);
      }),
    R.sum,
    R.modulo(R.__, 10),
    R.subtract(10),
    Math.abs,
  )(number);

  return calculatedCheck === parseInt(check, 10);
};
