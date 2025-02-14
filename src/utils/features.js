import getEnv from "../configs/config";
import { v4 as uuid } from "uuid";

const areCookiesEnabled = () => {
  document.cookie = `checkCookieBlocker=1; SameSite=None; Secure; path=/; domain=${getEnv("DOMAIN")}`;
  const isCookieSet = document.cookie.includes("checkCookieBlocker=");
  console.log("Cookies enabled: ", isCookieSet);

  return isCookieSet;
};

function customObjectId() {
  return uuid().replace(/-/g, "").substring(0, 24);
}

export { areCookiesEnabled, customObjectId };
