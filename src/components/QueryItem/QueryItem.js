import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToggleLayer } from "react-laag";
import { DropdownMenu } from "./DropdownMenu";
import "./QueryItem.css";
import { setCopied } from "../../redux/features/ui";
import { ReactComponent as DropdownIcon } from "../../img/dropdown.svg";

export const QueryItem = (props) => {
  const dispatch = useDispatch();
  const [isHovered, setHovered] = useState(false);
  const { copied, copiedId } = useSelector((state) => state.uiSlice);
  const isCopiedItem = props.id === copiedId;
  
  useEffect(() => {
    if (isCopiedItem) {
      const timer = setTimeout(() => dispatch(setCopied(false)), 1900);
      return () => {
        clearInterval(timer);
      };
    }
  }, [dispatch, copied, isCopiedItem]);

  return (
    <ToggleLayer
      renderLayer={({ isOpen, layerProps }) =>
        isOpen && (
          <DropdownMenu
            query={props.query}
            id={props.id}
            isHovered={isHovered}
            ref={layerProps.ref}
            className="layer"
            style={{
              ...layerProps.style,
              width: 126,
              left:layerProps.style.left+15||0
            }}
          ></DropdownMenu>
        )
      }
      placement={{
        anchor: "BOTTOM_RIGHT",
        possibleAnchors: [
          "BOTTOM_CENTER",
          "TOP_CENTER",
        ],
        autoAdjust: true,
        preferX: "RIGHT",
        triggerOffset: 30,
      }}
      fixed
      closeOnOutsideClick
    >
      {({ triggerRef, toggle }) => (
        <div
          className="query"
          onClick={toggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="query-wrapper">
            {isCopiedItem && copied && (
              <div className="copied">Скопировано</div>
            )}
            <div
              className={`query__status query__status--${
                !props.error ? "success" : "error"
              }`}
            ></div>
            <div className="query__type">{props.type}</div>
          </div>
          <div className="dropdown__icon" ref={triggerRef}>
            <DropdownIcon />
          </div>
        </div>
      )}
    </ToggleLayer>
  );
};
