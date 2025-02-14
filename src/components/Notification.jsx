import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../redux/slices/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, isVisible, type } = useSelector((state) => state.notification);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification()); 
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  return (
    <div className={`notification ${type === "error" ? "error" : "success"}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
