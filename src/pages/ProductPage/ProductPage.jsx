import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ProductPage = () => {

  const { category,title  } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const categoryClean = category.replace(/-/g, ''); // убираем тире
      const docRef = doc(db, categoryClean, title); 
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } 
    }

    fetchData();
  }, [category, title ]);

  if (!product) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <h1>{product.title}</h1>

      <img src={product.images[0]} alt={product.title}/>

      <p>{product.description}</p>

      <h3>Характеристики:</h3>
      <ul>
        {Object.entries(product.characteristics).map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductPage;