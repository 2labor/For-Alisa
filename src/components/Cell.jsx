import axios from "axios";
import React, { useEffect, useState } from "react"

const itemsUrl = 'https://67acbdef3f5a4e1477dbb3f2.mockapi.io/Items';

const Cell = (imageUrl, name) => {

  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const itemsResponse = await axios.get(itemsUrl);
      setItems(itemsResponse.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderLocked = () => {
    return (
      <div className="inventory-close">
        <img src="box.png" alt="Empty"/>
        <p>Неизвестно</p>
      </div>
    )
  }

  return (
    <div className="cell">
      <ul> 
        {
          items.map((item) => (
            <li className={item.status === 'locked' ? 'locked' : 'unlocked'} key={item.id}>
              {item.status === 'locked' ? (
                renderLocked()
              ) : (
                <>
                  <li>
                    <img src={item.imageUrl} alt={item.title} className="cell-img" />
                    <h3 className="cell-title">{item.title}</h3>
                  </li>
                </>
            )}
            </li>
          ))
        }
      </ul>
    </div>
  )
};

export default Cell;
