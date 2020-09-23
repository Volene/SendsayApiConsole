import React, { useRef, useEffect, useCallback } from "react";
import "./Forms.css";
import { ReactComponent as FmIcon } from "../img/align-right.svg";
import { useForm } from "react-hook-form";
import { SplitContainer } from "./SplitContainer";
import { useDispatch, useSelector } from "react-redux";
import { getQueryResponse } from "../redux/features/queryHistorySlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";

export const Forms = () => {
  const schema = yup.object({
    req: yup.object({
      action: yup.string().required(),
    }),
  });


  const currentRequest = useSelector(
    (state) => state.queryHistorySlice.currentRequest
  );
  const executedRequest = useSelector((state) => state.querySlice.query);


  const dispatch = useDispatch();
  const requestRef = useRef();
  const responseRef = useRef();
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
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
                <div className="left">
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
                <div className="right">
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
                    className={`request__input input textarea ${
                      currentRequest.error && "input--error"
                    }`}
                  ></textarea>
                </div>
              </SplitContainer>
            </div>
            <div className="footer">
              <button type="submit">Отправить</button>
              {/* <a>link to github</a> */}
              <div>ГитхабЛинк</div>
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
