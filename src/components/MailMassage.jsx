import React, { useState } from "react";
import MailModal from "./MailModal";

const MailMassage = ({ letter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={`mail ${letter.isActive ? "active" : ""}`} onClick={handleOpenModal}>
        <ul>
          <li>
            <img src={letter.avatarUrl} alt="avatar" className="mail-avatar" />
            <div className="author">
              <h1 className="author-name">{letter.name}</h1>
              <h2 className="author-subject">{letter.title}</h2>
              <p className="author-text">{letter.content.substring(0, 50)}...</p>
            </div>
          </li>
        </ul>
      </div>

      <MailModal isOpen={isModalOpen} onClose={handleCloseModal} letter={letter} />
    </>
  );
};

export default MailMassage;
