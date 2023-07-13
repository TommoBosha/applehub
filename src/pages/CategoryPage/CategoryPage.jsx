import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { database, ref, onValue } from "../../firebase/config";
import CategoryItemComponent from "../../components/CategoryComponent/CategoryItemComponent";

function CategoryPage() {
  const location = useLocation();
  const categoryPath = location.pathname.replace("/", ""); // Удалить первый слэш из пути

  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const categoryRef = ref(database, categoryPath);
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        setCategoryData(data);
      }
    });
  }, [categoryPath]);

  return (
    <div>
      <CategoryItemComponent categoryData={categoryData} />
    </div>
  );
}

export default CategoryPage;