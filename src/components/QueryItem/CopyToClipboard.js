import React from "react";
import { useDispatch} from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./CopyToClipBoard.css";
import { setCopied,setCopiedId} from "../../redux/features/ui";



 const CopyToClipboardMenuItem = ({ id,query,children }) => {
  const dispatch = useDispatch();
  
  const onCopy = () => {
    dispatch(setCopiedId(id))
    dispatch(setCopied(true));  
  };

  return (
    <CopyToClipboard onCopy={onCopy} text={query}>
      {children}
    </CopyToClipboard>
  );
};

export {CopyToClipboardMenuItem}
