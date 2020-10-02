import React, { useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import "./Forms.css";
import { SplitContainer } from "./SplitContainer";
import { getQueryResponse } from "../redux/features/queryHistorySlice";
import Loader from "../img/loader.svg";
import { ReactComponent as FmIcon } from "../img/align-right.svg";
import octocat from "../img/octocat.webp";

export const Forms = () => {
  const containsProhibitedCharacters = (string) => /[^.a-z]+/gi.test(string);

  const schema = yup.object({
    req: yup.object({
      action: yup
        .string()
        .test(
          "Should not contain a prohibited characters",
          (value) => !containsProhibitedCharacters(value)
        )
        .required(),
    }),
  });

  const currentRequest = useSelector(
    (state) => state.queryHistorySlice.currentRequest
  );
  
  const executedRequest = useSelector((state) => state.querySlice.query);
  const isLoading=useSelector((state)=>state.queryHistorySlice.loading);

  const dispatch = useDispatch();
  const requestRef = useRef();
  const responseRef = useRef();

  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError:false,
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data) => {
      dispatch(getQueryResponse(data.req));
    },
    [dispatch]
  );

  useEffect(() => {
    responseRef.current.value = currentRequest.response;
  }, [currentRequest.response]);

  useEffect(() => {
    requestRef.current.value = executedRequest;
    if (executedRequest) {
      responseRef.current.value = "";
      handleSubmit(onSubmit)();
    }
  }, [executedRequest, handleSubmit, onSubmit]);

  const formatJSON = () => {
    try {
      const str = JSON.stringify(JSON.parse(requestRef.current.value), null, 4);
      //^_^//
      requestRef.current.value = str;
    } catch {}
  };

  return (
    <>
      <div className="forms">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="textarea-container textarea">
              <SplitContainer className="wrap" sizes={[50, 50]}>
                <div className="left-split-container">
                  <div
                    className={`textarea__caption ${
                      errors.req && "textarea__caption--error"
                    }`}
                  >
                    Запрос
                  </div>
                  <textarea
                    name="req"
                    type="text"
                    autoComplete="none"
                    ref={(e) => {
                      register(e, {
                        validate: (value) => {
                          let returnState = true;
                          try {
                            returnState = typeof JSON.parse(value) === "object";
                          } catch (e) {
                            returnState = false;
                          }
                          return returnState;
                        },
                      });
                      requestRef.current = e;
                    }}
                    className={`request__input input textarea ${
                      errors.req && "input--error"
                    }`}
                  ></textarea>
                </div>
                <div className="right-split-container">
                  <div
                    className={`textarea__caption ${
                      currentRequest.error && "textarea__caption--error"
                    }`}
                  >
                    Ответ
                  </div>
                  <textarea
                    name="res"
                    readOnly="readonly"
                    ref={(e) => {
                      register(e);
                      responseRef.current = e;
                    }}
                    className={`request__input ${
                      currentRequest.error && "input--error"
                    } input textarea `}
                  ></textarea>
                </div>
              </SplitContainer>
            </div>
            <div className="forms__control">
              <button type="submit" className="login__button"> {isLoading ? <img src={Loader} alt="loader" /> : "Отправить"}</button>
              <a
                href="https://github.com/Volene"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="link-container">
                  <img
                    className="github-logo"
                    style={{ width: "40px" }}
                    src={octocat}
                    alt="octocat"
                  />{" "}
                  Volene
                  <img
                    className="github-logo"
                    style={{ width: "40px" }}
                    src={octocat}
                    alt="octocat"
                  />
                </div>
              </a>
              <div onClick={formatJSON} tabIndex="9" className="format_text">
                <FmIcon
                  className="format_icon"
                  alt="Formatting Button"
                ></FmIcon>
                <div>Форматировать</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
