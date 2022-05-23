import React from "react";
import { FaTimes, FaQuestion, FaCircle } from "react-icons/fa";

const Symbol = ({ type }) => {
  switch (type) {
    case false:
      return <FaTimes />;

    case true:
      return <FaCircle />;

    default:
      return <FaQuestion />;
  }
};

export default Symbol;
