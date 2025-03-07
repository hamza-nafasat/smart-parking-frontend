import getEnv from '../configs/config';
import { v4 as uuid } from 'uuid';

const areCookiesEnabled = () => {
  document.cookie = `checkCookieBlocker=1; SameSite=None; Secure; path=/; domain=${getEnv('DOMAIN')}`;
  const isCookieSet = document.cookie.includes('checkCookieBlocker=');
  console.log('Cookies enabled: ', isCookieSet);

  return isCookieSet;
};

const customObjectId = () => uuid().replace(/-/g, '').substring(0, 24);

const timeFormate = (dateTime) => {
  return new Date(dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Karachi',
  });
};
const dateFormate = (dateTime) => {
  return new Date(dateTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export { areCookiesEnabled, customObjectId, timeFormate, dateFormate };
