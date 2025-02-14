import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchCheckpoints } from "../redux/slices/checkpointsSlice";

const CheckpointMap = () => {
  const dispatch = useDispatch();
  const checkpoints = useSelector((state) => state.checkpoints.checkpoints);

  useEffect(() => {
    dispatch(fetchCheckpoints()); // Загружаем чекпоинты с MockAPI
  }, [dispatch]);

  // Фильтруем чекпоинты по статусам
  const unlockedCheckpoints = checkpoints.filter((cp) => cp.status === "unlocked");
  const lockedCheckpoints = checkpoints.filter((cp) => cp.status === "locked");

  return (
    <MapContainer center={[53.35380877735554, -6.274577397306822]} zoom={14} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Показываем первый разблокированный чекпоинт */}
      {unlockedCheckpoints.length > 0 && (
        <Marker key={unlockedCheckpoints[0].id} position={[unlockedCheckpoints[0].lat, unlockedCheckpoints[0].lng]}>
          <Popup>Мы тут</Popup>
        </Marker>
      )}

      {/* Показываем второй заблокированный чекпоинт */}
      {lockedCheckpoints.length > 0 && (
        <Marker key={lockedCheckpoints[0].id} position={[lockedCheckpoints[0].lat, lockedCheckpoints[0].lng]}>
          <Popup>Следующий чекпоинт</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default CheckpointMap;
