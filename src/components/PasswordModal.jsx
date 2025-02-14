import React, { useState } from "react";
import PasswordInput from "./PasswordInput"; // Импортируем компонент для ввода пароля

const PasswordModal = ({ closeModal }) => {
  const [modalActive, setModalActive] = useState(true); // Стейт для отслеживания состояния модального окна

  const handleClose = () => {
    setModalActive(false); // Закрываем окно
    closeModal(); // Даем возможность родительскому компоненту закрыть окно
  };

  return (
    <div className={`modal ${modalActive ? "active" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Введите пароль</h2>

        {/* Передаем handleClose как коллбэк в PasswordInput */}
        <PasswordInput onSuccess={handleClose} />

        <button onClick={handleClose} className="close-btn">Закрыть</button>
      </div>
    </div>
  );
};

export default PasswordModal;
