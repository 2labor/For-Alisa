import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  letters: [],  // Здесь будут храниться все письма
  readLetters: [], // Массив с прочитанными письмами
};

const mailsSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setLetters: (state, action) => {
      state.letters = action.payload;
    },
    updateLetterStatus: (state, action) => {
      const { id, status } = action.payload;
      const letter = state.letters.find((l) => l.id === id);
      if (letter) {
        letter.status = status;  // Обновляем статус письма
        // Сохраняем обновленные письма в localStorage
        localStorage.setItem("letters", JSON.stringify(state.letters));
      }
    },
    markLetterAsRead: (state, action) => {
      const id = action.payload;
      const letter = state.letters.find((l) => l.id === id);
      if (letter && !state.readLetters.includes(id)) {
        state.readLetters.push(id);
        // Сохраняем прочитанные письма в localStorage
        localStorage.setItem("readLetters", JSON.stringify(state.readLetters));
      }
    },
    toggleLetterActive: (state, action) => {
      const id = action.payload;
      const letter = state.letters.find((l) => l.id === id);
      if (letter) {
        letter.isActive = !letter.isActive;  // Переключаем активность письма
      }
    },
    loadReadLettersFromStorage: (state) => {
      const savedReadLetters = JSON.parse(localStorage.getItem("readLetters")) || [];
      state.readLetters = savedReadLetters;
    },
  },
});

export const { 
  setLetters, 
  updateLetterStatus, 
  markLetterAsRead, 
  toggleLetterActive, 
  loadReadLettersFromStorage 
} = mailsSlice.actions;

export default mailsSlice.reducer;
