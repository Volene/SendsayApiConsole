import Sendsay from "sendsay-api";
import Cookies from "js-cookie";

const sendsayApi = new Sendsay();

const userNameOptions = {
  action: "sys.settings.get",
  list: ["about.id", "about.name"],
};

const sendRequest = async (query) => {
  const res = await sendsayApi.request(query);
  return res;
};

const userLogin = async (username, sublogin, password) => {
  await sendsayApi.login({
    login: username,
    sublogin: sublogin,
    password: password,
  });

  const userName = await sendsayApi.request(userNameOptions);
  const currentSession = sendsayApi.session;
  Cookies.set("sendsay_session", currentSession,{});
  
  return userName;
};

const renewSession = async () => {
  await sendsayApi.setSessionFromCookie();
  const userName = await sendsayApi.request(userNameOptions);
  return userName;
};

export { sendsayApi, sendRequest, renewSession, userLogin };
