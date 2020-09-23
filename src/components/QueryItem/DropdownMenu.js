import React from "react";
import "./DropdownMenu.css";
import { useDispatch } from "react-redux";
import { removeQuery } from "../../redux/features/queryHistorySlice";
import { setQuery } from "../../redux/features/querySlice";

export const DropdownMenu = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const menuItems = [
    {
      type: "",
      height: 45,
      alignSelf: "bottom",
      title: "Выполнить",
      cb: () => dispatch(setQuery(props.query)),
    },
    { type: "divider", height: 1 },
    { type: "copy", height: 50, alignSelf: "center", title: "Скопировать" },
    { type: "divider", height: 1 },
    {
      type: "delete",
      height: 50,
      alignSelf: "center",
      title: "Удалить",
      cb: () => dispatch(removeQuery(props.id)),
    },
  ];

  const gridRows = menuItems.reduce(
    (rows, item) => (rows += item.height + "px "),
    ""
  );
  const menuItemClasses = {
    delete: "menu__item--delete",
    copy: "menu__item--copy",
    divider: "menu__item__divider",
  };

  function DropdownItem({ props }) {
    return (
      <div
        className={`menu__item  ${menuItemClasses[props.type]}`}
        style={{ alignSelf: props.alignSelf }}
        onClick={props.cb ? props.cb : null}
      >
        {props.title}
      </div>
    );
  }

  return (
    <div>
      <div className="dropdown" ref={ref}>
        <div
          className="menu"
          style={{
            gridTemplateRows: gridRows,
            ...props.style,
            top: props.style.top - 30,
            // left: props.style.left - 40,
          }}
        >
          {menuItems.map((item, i) => (
            <DropdownItem key={i} props={item} />
          ))}
        </div>
      </div>
    </div>
  );
});
