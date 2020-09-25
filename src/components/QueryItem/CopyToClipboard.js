import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch} from "react-redux";
import { setCopied,setCopiedId} from "../../redux/features/ui";
import "./CopyToClipBoard.css";

export const CopyToClipboardContainer = ({ id,query,children }) => {
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

