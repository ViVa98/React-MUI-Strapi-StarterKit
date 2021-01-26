/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const login = useSelector((state) => state.user.jwt);

  const history = useHistory();

  if (login === undefined) {
    history.push("/login");
  }

  return <div>HEllO ADMIN</div>;
}
