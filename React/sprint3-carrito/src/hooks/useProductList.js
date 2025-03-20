// src/hooks/useProductList.js
import { useState } from "react";

const defaultProducts = [
  { id: 1, name: "Notebook", price: 450000, imgSrc: "/public/assets/img/imagen1.jpg" },
  { id: 2, name: "Mouse Inalámbrico", price: 15000, imgSrc: "/public/assets/img/imagen2.jpg" },
  { id: 3, name: "Teclado Rosa", price: 32000, imgSrc: "/public/assets/img/imagen3.jpg" },
  { id: 4, name: "Monitor 24' Full HD", price: 120000, imgSrc: "/public/assets/img/imagen4.jpg" },
  { id: 5, name: "Auriculares Bluetooth", price: 25000, imgSrc: "/public/assets/img/imagen5.jpg" },
  { id: 6, name: "Parlante Bluetooth", price: 18000, imgSrc: "/public/assets/img/imagen6.jpg" },
  { id: 7, name: "Webcam HD", price: 7000, imgSrc: "/public/assets/img/imagen7.jpg" },
  { id: 8, name: "Cargador Rápido", price: 3000, imgSrc: "/public/assets/img/imagen8.jpg" },
  { id: 9, name: "Memoria SSD", price: 45000, imgSrc: "/public/assets/img/imagen9.jpg" },
  { id: 10, name: "Cable HDMI 4K", price: 1500, imgSrc: "/public/assets/img/imagen10.jpg" },
  { id: 11, name: "Router Wi-Fi 6", price: 25000, imgSrc: "/public/assets/img/imagen11.jpg" },
  { id: 12, name: "Mouse Pad", price: 4000, imgSrc: "/public/assets/img/imagen12.jpg" },
];


export const useProductList = () => {
  const [products, setProducts] = useState(defaultProducts);

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return { products, addProduct };
};
