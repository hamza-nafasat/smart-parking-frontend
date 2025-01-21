import getEnv from "../configs/config";

const areCookiesEnabled = () => {
  document.cookie = `checkCookieBlocker=1; SameSite=None; Secure; path=/; domain=${getEnv("DOMAIN")}`;
  const isCookieSet = document.cookie.includes("checkCookieBlocker=");
  console.log("Cookies enabled: ", isCookieSet);

  return isCookieSet;
};

export { areCookiesEnabled };
