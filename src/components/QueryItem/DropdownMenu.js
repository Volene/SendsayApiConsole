import React from "react";
import "./DropdownMenu.css";
import { useDispatch } from "react-redux";
import { removeQuery as removeQueryAction } from "../../redux/features/queryHistorySlice";
import { setQuery } from "../../redux/features/querySlice";
import { CopyToClipboardMenuItem } from "./CopyToClipboard";

export const DropdownMenu = React.forwardRef(({query,id,style}, ref) => {

  const dispatch = useDispatch();
  const executeQuery = () => dispatch(setQuery(query));
  const removeQuery = () => dispatch(removeQueryAction(id));
  
  const menuItemClasses = {
    delete: "menu__item--delete",
    copy: "menu__item--copy",
    divider: "menu__item__divider",
  };

  return (
    <div>
      <div className="dropdown" ref={ref}>
        <div
          className="menu"
          style={{
            ...style,
            top: style.top - 30 || 0,
          }}
        >
          <div className="menu__item-wrapper">
            <div onClick={executeQuery} className={`menu__item `}>
              Выполнить
            </div>
          </div>
          <div className="menu__item-wrapper">
            <CopyToClipboardMenuItem id={id} query={query}>
              <div className={`menu__item ${menuItemClasses.copy}`}>
                Скопировать
              </div>
            </CopyToClipboardMenuItem>
          </div>
          <div className="menu__item-wrapper">
            <div
              onClick={removeQuery}
              className={`menu__item ${menuItemClasses.delete}`}
            >
              Удалить
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
