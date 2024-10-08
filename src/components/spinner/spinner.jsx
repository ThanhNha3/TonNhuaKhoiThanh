import React from "react";
import {Oval} from "react-loader-spinner";

const SpinnerLoader = () => {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default SpinnerLoader;
