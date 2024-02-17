import React from "react";
import { TiWarning } from "react-icons/ti";
import { FaRegCircleCheck } from "react-icons/fa6";

const ResponseMessage = ({ error = false, message }) => {
  return (
    <div
      className={`${
        error ? "bg-red-600" : "bg-emerald-600"
      } rounded-xl py-2 px-6 flex items-center justify-center gap-2`}
    >
      {error ? (
        <TiWarning fill="white" fontSize={25} />
      ) : (
        <FaRegCircleCheck fill="white" />
      )}
      <div className="text-md text-white">{message}</div>
    </div>
  );
};

export default ResponseMessage;
