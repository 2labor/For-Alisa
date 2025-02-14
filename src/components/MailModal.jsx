import React from "react";

const MailModal = ({ isOpen, onClose, letter }) => {
  if (!isOpen || !letter) return null;

  return (
    <div className="mail-modal-overlay" onClick={onClose}>
      <div className="mail-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="mail-modal-close" onClick={onClose}>✖</button>
        <div className="mail-modal-header">
          <img src={letter.avatarUrl} alt="Avatar" className="mail-modal-avatar" />
          <div>
            <h1 className="mail-modal-name">{letter.name}</h1>
            <h2 className="mail-modal-title">{letter.title}</h2>
          </div>
        </div>
        <div className="mail-modal-body">
          <p className="mail-modal-text">{letter.content}</p>
          {letter.media && <img src={letter.media} alt="Attachment" className="mail-modal-media" />}
        </div>
      </div>
    </div>
  );
};

export default MailModal;
