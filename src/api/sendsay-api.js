import Sendsay from "sendsay-api";
import Cookies from "js-cookie";
// import { sendSayAuth } from "../redux/features/authSlice";
export const sendsayApi = new Sendsay();
//rae3Uluqu
const getLogin = {
  action: "sys.settings.get",
  list: ["about.id", "about.name"],
};

export const  sendRequest = async (query) => {
  const res = await sendsayApi.request(query);
  console.log('apiSendRequest '+JSON.stringify(res))
  return res;
};

export const loginUser = async (username, sublogin, password) => {
  console.log(username, sublogin, password);
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

export const renewSession = async () => {
  await sendsayApi.setSessionFromCookie();
  const res = await sendsayApi.request(getLogin);


  return res;
};