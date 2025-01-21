import getEnv from "../configs/config";

const areCookiesEnabled = () => {
  document.cookie = `checkCookieBlocker=1; SameSite=None; Secure; path=/; domain=${getEnv("SERVER_URL")}`;
  const isCookieSet = document.cookie.indexOf("checkCookieBlocker") !== -1;
  console.log("Cookies enabled: ", isCookieSet);

  return isCookieSet;
};

export { areCookiesEnabled };
