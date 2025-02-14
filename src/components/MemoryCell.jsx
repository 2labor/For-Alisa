import React, { useEffect, useState } from "react";

const MemoryCell = () => {
  const [memories, setMemories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);

  useEffect(() => {
    const savedLetters = JSON.parse(localStorage.getItem("letters")) || [];

    // Фильтруем только ОТКРЫТЫЕ письма
    const unlockedLetters = savedLetters.filter((letter) => letter.status === "unlocked");

    setMemories(unlockedLetters);
  }, []);

  const openModal = (memory) => {
    setSelectedMemory(memory); // Устанавливаем выбранный элемент
    setIsModalOpen(true); // Открываем модальное окно
  };

  const closeModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
    setSelectedMemory(null); // Очищаем выбранный элемент
  };

  return (
    <div className="memoryCell">
      <ul>
        {memories.length > 0 ? (
          memories.map((memory) => (
            <li key={memory.id} className="unlocked" onClick={() => openModal(memory)}>
              <img src={memory.media} alt={memory.title} className="memoryCell-img" />
              <h3 className="memoryCell-title">{memory.title}</h3>
            </li>
          ))
        ) : (
          <p>Архив пуст</p>
        )}
      </ul>

      {/* Модальное окно */}
      {isModalOpen && selectedMemory && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{selectedMemory.title}</h3>
            <img className="modal-full" src={selectedMemory.media} alt={selectedMemory.title} />
            <button className="close-modal" onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryCell;
