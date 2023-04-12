import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";

const Message = ({data}) => {

  return (
    <div>
         {data.msg}
    </div>
  )
}

export default Message;