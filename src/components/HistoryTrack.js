import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./HistoryTrack.css";
import { QueryItem } from "./QueryItem/QueryItem";
import { removeQueries } from "../redux/features/queryHistorySlice";
import clearIcon from "../img/clearhistory.svg";

export const HistoryTrack = () => {
  const queries = useSelector((state) => state.queryHistorySlice.queries);
  const dispatch = useDispatch();

  return (
    <div className="history-track">
      <div className="history-track__queries queries">
        {queries.map(({ ...props }) => (
          <QueryItem key={props.id} {...props} />
        ))}
      </div>
      <div className="gradient"></div>
      <div
        className="history-track__clear-history-button clear-history-button"
        onClick={() => dispatch(removeQueries())}
      >
        <img
          alt="clear-icon"
          src={clearIcon}
          className="clear-history-button__icon"
        />
      </div>
    </div>
  );
};
