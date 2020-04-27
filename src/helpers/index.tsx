export { default as chartjs } from './chartjs.js';
export { default as getInitials } from './getInitials';

export const PwdRule = new RegExp(/^[\w]{6,20}$/);
export const EmailRule = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
);
