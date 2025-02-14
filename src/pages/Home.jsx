import React, { useState } from "react";
import CheckpointMap from "../components/CheckpointMap";
import PasswordModal from "../components/PasswordModal"; // Импортируем PasswordModal
import WelcomeModal from "../components/WelcomeModal";
import TestComponent from "../components/TestComponent";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false); // Состояние для открытия/закрытия модального окна

  // Функции для открытия и закрытия модального окна
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <CheckpointMap />
      <WelcomeModal />
      {/* Кнопка для открытия модального окна */}
      <button className="open-modal-btn" onClick={handleOpenModal}>
        +
      </button>

      {/* Передаем функцию закрытия в PasswordModal */}
      {modalOpen && <PasswordModal closeModal={handleCloseModal} />}
    </div>
  );
};

export default Home;
