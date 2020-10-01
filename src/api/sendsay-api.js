import Sendsay from "sendsay-api";
import Cookies from "js-cookie";

const sendsayApi = new Sendsay();
const getLogin = {
  action: "sys.settings.get",
  list: ["about.id", "about.name"],
};

const sendRequest = async (query) => {
  const res = await sendsayApi.request(query);
  return res;
};

const loginUser = async (username, sublogin, password) => {
  await sendsayApi.login({
    login: username,
    sublogin: sublogin,
    password: password,
  });

  const res = await sendsayApi.request(getLogin);
  const currentSession = sendsayApi.session;
  Cookies.set("sendsay_session", currentSession);
  return res;
};

const renewSession = async () => {
  await sendsayApi.setSessionFromCookie();
  const res = await sendsayApi.request(getLogin);
  return res;
};

export { sendsayApi, sendRequest, renewSession, loginUser };
