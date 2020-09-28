import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { sendSayAuth, renewSessions } from "../redux/features/authSlice";
import Logo from "../img/logo.svg";
import SadSmile from "../img/mehsmile.svg";
import Loader from "../img/loader.svg";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.authSlice.error);
  const isLogging = useSelector((state) => state.authSlice.logging);

  const containsProhibitedCharacters = (string) => /[^a-z_0-9]+/gi.test(string);
  const passwordContainsProhibitedCharacters = (string) =>
    /[^a-z_0-9\s]+/gi.test(string);

  const schema = yup.object({
    loginName:
      yup.string().email().required() |
      yup
        .string()
        .test(
          "Should not contain a prohibited characters",
          (value) => !containsProhibitedCharacters(value)
        )
        .required(),
    subLoginName: yup.string().min(3),
    password: yup
      .string()
      .test(
        "Should not contain a prohibited characters",
        (value) => !passwordContainsProhibitedCharacters(value)
      )
      .required(),
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    submitFocusError: true,
    resolver: yupResolver(schema),
  });

  const styles = {
    inputErrorStyle: {
      border: "1px solid #CF2C00",
      boxShadow: "0px 0px 5px rgba(207, 44, 0, 0.5)",
    },
  };

  const onSubmit = async (data) => {
    dispatch(sendSayAuth(data));
  };

  React.useEffect(() => {
    async function tryRestoreSession() {
      dispatch(renewSessions());
    }
    if (Cookies.get("sendsay_session")) tryRestoreSession();
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className="logo_wrapper">
        <img src={Logo} alt="logo"></img>
      </div>
      <div className="form_container">
        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login_form__title ">API-консолька</div>
          {loginError ? (
            <div className="error_container">
              <img
                className="error_container__smile"
                src={SadSmile}
                alt="sadsmile"
              />
              <div className="error_container__details">
                <div className="error_container__error_text">
                  {"Вход не вышел"}
                </div>
                <div className="error_container__error_code">
                  {JSON.stringify(loginError)}
                </div>
              </div>
            </div>
          ) : null}

          <div className="input-wrapper">
            <div
              className={`input_label `}
              style={errors.loginName && styles.divErrorStyle}
            >
              Логин
            </div>
            <input
              name="loginName"
              type="text"
              className={`login_form__input input ${
                errors.loginName && `input--error`
              }`}
              ref={register({ required: "this is a required" })}
            />
          </div>

          <div className="input-wrapper">
            <div className="label-wrapper">
              <div className="input_withsublabel">Сублогин</div>
              <div className="input_sublabel">Опционально</div>
            </div>
            <input
              name="subLoginName"
              type="text"
              className="login_form__input input"
              ref={register({ name: "subLoginName" })}
            />
          </div>

          <div className="input-wrapper">
            <div
              className="input_label"
              style={errors.password && styles.divErrorStyle}
            >
              Пароль
            </div>
            <input
              name="password"
              type="password"
              autoComplete="none"
              className={`login_form__input input ${
                errors.password && `input--error`
              }`}
              ref={register({ required: "this is a required" })}
            />
          </div>
          <div className="button__wrapper">
            <button className="login__button" type="submit">
              {isLogging ? <img src={Loader} alt="loader" /> : "Войти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
