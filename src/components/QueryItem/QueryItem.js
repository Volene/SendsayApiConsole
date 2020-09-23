import React, { useState } from "react";
import { ReactComponent as DropdownIcon } from "../../img/dropdown.svg";
import { ToggleLayer } from "react-laag";

import "./QueryItem.css";
import { DropdownMenu } from "./DropdownMenu";


export const QueryItem = (props) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <ToggleLayer
      renderLayer={({ isOpen, layerProps, }) =>
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
            }}
          ></DropdownMenu>
        )
      }
      placement={{
        anchor: "BOTTOM_RIGHT",
        possibleAnchors: [
          "LEFT_CENTER",
          "BOTTOM_CENTER",
          "RIGHT_CENTER",
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
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="query-wrapper">
            <div
              className={`query__status query__status--${
                !props.error ? "success" : "error"
              }`}
            ></div>
            <div className="query__type">{props.type}</div>
          </div>
          <div className="dropdown__icon" ref={triggerRef} onClick={toggle}>
            <DropdownIcon />
          </div>
        </div>
      )}
    </ToggleLayer>
  );
};
