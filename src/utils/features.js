const areCookiesEnabled = () => {
  document.cookie = "test_cookie=1; SameSite=None; Secure";
  return document.cookie.indexOf("test_cookie") !== -1;
};

export { areCookiesEnabled };
