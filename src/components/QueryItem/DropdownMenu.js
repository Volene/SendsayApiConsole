import React from "react";
import "./DropdownMenu.css";
import { useDispatch } from "react-redux";
import { removeQuery } from "../../redux/features/queryHistorySlice";
import { setQuery } from "../../redux/features/querySlice";
import { CopyToClipboardContainer } from "./CopyToClipboard";
export const DropdownMenu = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const handleExecQuery = () => dispatch(setQuery(props.query));
  const handleRemoveQuery = () => dispatch(removeQuery(props.id));
  
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
            ...props.style,
            top: props.style.top - 30 || 0,
          }}
        >
          <div className="menu__item-wrapper">
            <div onClick={handleExecQuery} className={`menu__item `}>
              Выполнить
            </div>
          </div>
          <div className="menu__item-wrapper">
            <CopyToClipboardContainer id={props.id} query={props.query}>
              <div className={`menu__item ${menuItemClasses.copy}`}>
                Скопировать
              </div>
            </CopyToClipboardContainer>
          </div>
          <div className="menu__item-wrapper">
            <div
              onClick={handleRemoveQuery}
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
