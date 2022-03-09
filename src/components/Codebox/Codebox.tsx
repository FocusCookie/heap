import React from "react";
import "./Codebox.css";

type Props = {
  children: any;
};

export default function Codebox({ children }: Props) {
  return (
    <div className="codebox">
      <div className="codebox__topbar">
        <div className="codebox__topbar__control codebox__topbar__control--red"></div>
        <div className="codebox__topbar__control codebox__topbar__control--yellow"></div>
        <div className="codebox__topbar__control codebox__topbar__control--green"></div>
      </div>
      <div className="codebox__content">{children}</div>
    </div>
  );
}
