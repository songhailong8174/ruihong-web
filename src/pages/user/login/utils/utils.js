import { parse } from 'qs';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return sessionStorage.setItem('u-r', JSON.stringify(proAuthority));
}
