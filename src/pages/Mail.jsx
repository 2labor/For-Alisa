import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { markLetterAsRead, toggleLetterActive } from "../redux/slices/mailsSlice";
import { showNotification } from "../redux/slices/notificationSlice"; // импортируем action для уведомлений
import MailMassage from "../components/MailMassage";

const Mail = () => {
  const letters = useSelector((state) => state.mail.letters);
  const dispatch = useDispatch();

  const handleLetterClick = (id, isRead) => {
    dispatch(markLetterAsRead(id));
    dispatch(toggleLetterActive(id)); 
    if (!isRead) {
      dispatch(showNotification("📩 Письмо было открыто!"));
    }
  };

  return (
    <div className="container">
      <ul>
        {letters.map((letter) => (
          <li
            key={letter.id}
            className={letter.status === "locked" ? "locked" : "unlocked"}
            onClick={() => handleLetterClick(letter.id, letter.status === "locked" ? false : true)} 
          >
            {letter.status === "locked" ? (
              <></>
            ) : (
              <MailMassage
                letter={letter } 
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mail;
