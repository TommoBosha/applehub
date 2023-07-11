import React, { useEffect, useState } from 'react';
import { database, ref, onValue } from '../../firebase/config';

const headphonesRef = ref(database, "headphones");
const MyComponent = () => {
   const [headphonesData, setHeadphonesData] = useState(null);

  useEffect(() => {
    onValue(headphonesRef, (snapshot) => {
      const data = snapshot.val();
      setHeadphonesData(data);
    });
  }, []);

  return (
    <div>
      <h1>Headphones</h1>
      {headphonesData ? (
        Object.keys(headphonesData).map((key) => (
          <div key={key}>
            <h2>{headphonesData[key].title}</h2>
            <p>Category: {headphonesData[key].category}</p>
            <p>Model: {headphonesData[key].model}</p>
            <p>Price: {headphonesData[key].price}</p>
            <img src={headphonesData[key].images[0]} alt="Product" />
          </div>
        ))
      ) : (
        <p>Loading headphones data...</p>
      )}
    </div>
  );
};


export default MyComponent;