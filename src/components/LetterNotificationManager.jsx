import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLetters, updateLetterStatus, markLetterAsRead } from "../redux/slices/mailsSlice"; 
import { showNotification } from "../redux/slices/notificationSlice";
import axios from "axios";

const API_URL = "https://67acbdef3f5a4e1477dbb3f2.mockapi.io/Emails";


const LetterNotificationManager = () => {
  const distance = useSelector((state) => state.distance.distance); // Получаем дистанцию из Redux
  const letters = useSelector((state) => state.mail.letters); // Получаем письма из Redux
  const dispatch = useDispatch();

  // Загружаем письма с сервера только один раз при первом монтировании
  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await axios.get(API_URL);

        // Проверяем, есть ли письма в localStorage
        const savedLetters = JSON.parse(localStorage.getItem("letters"));
        if (savedLetters && savedLetters.length > 0) {
          // Если письма есть в localStorage, загружаем их в Redux
          dispatch(setLetters(savedLetters));
        } else {
          // Если писем нет в localStorage, сохраняем их в Redux и в localStorage
          const fetchedLetters = response.data;
          dispatch(setLetters(fetchedLetters));
          localStorage.setItem("letters", JSON.stringify(fetchedLetters)); // Сохраняем письма в localStorage
        }
      } catch (error) {
        console.error("Ошибка загрузки писем:", error);
      }
    };

    fetchLetters();
  }, [dispatch]);

  // Загружаем сохранённую дистанцию из localStorage при старте
  useEffect(() => {
    const savedDistance = localStorage.getItem("distance");
    if (savedDistance) {
      dispatch({ type: "distance/setDistance", payload: Number(savedDistance) });
    }
  }, [dispatch]);

  // Обновляем distance в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("distance", distance);
  }, [distance]);

  // Логика для отправки уведомлений
  useEffect(() => {
    const readLetters = JSON.parse(localStorage.getItem("readLetters")) || [];

    letters.forEach((letter) => {
      // Проверяем, что письмо еще не прочитано и оно подходит по расстоянию
      
      if (letter.status === "locked" && letter.location <= distance && !readLetters.includes(letter.id)) {
        dispatch(showNotification({message: "📩 У вас новое письмо!", type: "success"}));
        
        // Обновляем статус письма
        dispatch(updateLetterStatus({ id: letter.id, status: "unlocked", unlocked_at: new Date().toISOString() }));
        
        // Обновляем список прочитанных писем и сохраняем в localStorage
        readLetters.push(letter.id);
        localStorage.setItem("readLetters", JSON.stringify(readLetters));

        // Обновляем Redux с новым списком прочитанных писем
        dispatch(markLetterAsRead(letter.id));
      }
    });
  }, [distance, letters, dispatch]);

  return null; // Компонент не рендерит ничего, он только управляет состоянием
};

export default LetterNotificationManager;
