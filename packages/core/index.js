// eslint-disable-next-line import/prefer-default-export
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
