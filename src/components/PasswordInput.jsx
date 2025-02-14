import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unlockCheckpoint } from "../redux/slices/checkpointsSlice";
import { showNotification } from "../redux/slices/notificationSlice";
import { incrementDistance } from "../redux/slices/distanceSlice";

const PasswordInput = ({ onSuccess }) => {
  const [password, setPassword] = useState(""); // Состояние для пароля
  const checkpoints = useSelector((state) => state.checkpoints.checkpoints); // Получаем чекпоинты из стора
  const dispatch = useDispatch(); // Диспетчер для Redux экшенов

  const handleUnlock = () => {
    // Ищем чекпоинт с данным паролем (регистр игнорируется)
    const checkpoint = checkpoints.find((cp) => cp.password.toLowerCase() === password.toLowerCase());

    if (checkpoint) {
      if (checkpoint.status === "locked") {
        dispatch(unlockCheckpoint(checkpoint.id)); // Разблокируем чекпоинт
        dispatch(incrementDistance());
        dispatch(showNotification({ message: "✅ Чекпоинт открыт!", type: "success" }));

        setPassword(""); // Очистим поле ввода
        if (onSuccess) onSuccess(); // Закрываем модальное окно
      }
    } else {
      dispatch(showNotification({ message: "🙈 Неверный пароль!", type: "error" }));
    }
  };

  return (
    <div>
      <input
        type="text"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Обновление состояния пароля
        placeholder="Введите пароль"
      />
      <button className="submit-btn" onClick={handleUnlock}>
        Разблокировать
      </button>
    </div>
  );
};

export default PasswordInput;
