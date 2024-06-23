import "./App.css";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";

const App = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const getAllProducts = async () => {
    const data = await fetch(
      `http://127.0.0.1:3000/api/v1/products/getAll-products`
    );
    const response = await data.json();
    const category = [
      ...new Set(response?.data?.Allproducts.map((item) => item.category)),
    ];
    setCategory(["all", ...category]);

    setProducts(response?.data?.Allproducts);
  };

  // console.log(category);

  const handleClick = async (item, index) => {
    setSelectedItem(index);
    const data = await fetch(
      `http://127.0.0.1:3000/api/v1/products/getAll-products?category=${item}`
    );
    const response = await data.json();
    setProducts(response?.data?.Allproducts);
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div
        className="w-full flex 
     justify-center items-center gap-2 p-2"
      >
        {category.map((item, index) => {
          // fix this
          return (
            <span
              key={index}
              onClick={() => handleClick(item, index)}
              className={`uppercase rounded-sm px-2 cursor-pointer ${
                index === selectedItem
                  ? "bg-slate-800 text-white"
                  : "bg-white text-black"
              }`}
            >
              {item}
            </span>
          );
        })}
      </div>
      <div className="w-full flex items-center justify-center mx-auto flex-wrap gap-4">
        {products?.map((item) => {
          return (
            <Card
              key={item._id}
              image={item.productImage}
              title={item.title}
              category={item.category}
              description={item.description}
            />
          );
        })}
      </div>
    </>
  );
};

export default App;
