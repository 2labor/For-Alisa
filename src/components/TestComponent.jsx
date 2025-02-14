// src/components/TestComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementDistance } from '../redux/slices/distanceSlice';
import Mail from '../pages/Mail';

const TestComponent = () => {
  const dispatch = useDispatch();
  const { distance } = useSelector((state) => state.distance);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incrementDistance()); 
    }, 3000); 

    return () => clearInterval(interval); 
  }, [dispatch]);

  return (
    <div>
      <h1>Тестирование писем по мере движения</h1>
      <p>Текущая дистанция: {distance} метров</p>
    </div>
  );
};

export default TestComponent;
