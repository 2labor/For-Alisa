import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL MockAPI
const API_URL = "https://67adca273f5a4e1477df184a.mockapi.io/Checkpoints";

// Функция загрузки из localStorage
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("checkpoints");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Ошибка загрузки чекпоинтов из localStorage:", error);
    return null;
  }
};

// Функция сохранения в localStorage
const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem("checkpoints", JSON.stringify(data));
  } catch (error) {
    console.error("Ошибка сохранения чекпоинтов в localStorage:", error);
  }
};

// Асинхронное получение чекпоинтов с MockAPI (если в localStorage нет данных)
export const fetchCheckpoints = createAsyncThunk("checkpoints/fetchCheckpoints", async () => {
  try {
    const localData = loadFromLocalStorage();
    if (localData) return localData; // Если есть сохраненные данные, используем их

    const response = await axios.get(API_URL);
    saveToLocalStorage(response.data); // Сохраняем данные после загрузки
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки чекпоинтов с сервера:", error);
    throw error;
  }
});

// Инициализируем состояние (берем из localStorage, если есть)
const initialState = {
  checkpoints: loadFromLocalStorage() || [],
};

const checkpointsSlice = createSlice({
  name: "checkpoints",
  initialState,
  reducers: {
    unlockCheckpoint: (state, action) => {
      const checkpointId = action.payload;

      // Находим первый разблокированный чекпоинт и переводим в статус "completed"
      const unlockedCheckpoint = state.checkpoints.find((cp) => cp.status === "unlocked");
      if (unlockedCheckpoint) {
        unlockedCheckpoint.status = "completed";
      }

      // Разблокируем новый чекпоинт
      const checkpoint = state.checkpoints.find((cp) => cp.id === checkpointId);
      if (checkpoint && checkpoint.status === "locked") {
        checkpoint.status = "unlocked";
      }

      saveToLocalStorage(state.checkpoints); // Сохраняем обновленное состояние
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCheckpoints.fulfilled, (state, action) => {
      state.checkpoints = action.payload;
      saveToLocalStorage(state.checkpoints); // Сохраняем после загрузки
    });
  },
});

export const { unlockCheckpoint } = checkpointsSlice.actions;
export default checkpointsSlice.reducer;
