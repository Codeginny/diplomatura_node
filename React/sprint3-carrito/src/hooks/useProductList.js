// src/hooks/useProductList.js
import { useState } from "react";

const defaultProducts = [
  { id: 1, name: "Notebook", price: 450000, imgSrc: "/assets/laptop.jpg" },
  { id: 2, name: "Mouse Inalámbrico", price: 15000, imgSrc: "/assets/mouse.jpg" },
  { id: 3, name: "Teclado Rosa", price: 32000, imgSrc: "/assets/teclado.jpg" },
  { id: 4, name: "Monitor 24' Full HD", price: 120000, imgSrc: "/assets/monitor.jpg" },
  { id: 5, name: "Auriculares Bluetooth", price: 25000, imgSrc: "/assets/auriculares.jpg" },
  { id: 6, name: "Parlante Bluetooth", price: 18000, imgSrc: "/assets/parlante.jpg" },
  { id: 7, name: "Webcam HD", price: 7000, imgSrc: "/assets/webcam.jpg" },
  { id: 8, name: "Cargador Rápido", price: 3000, imgSrc: "/assets/cargador.jpg" },
  { id: 9, name: "Memoria SSD", price: 45000, imgSrc: "/assets/ssd.jpg" },
  { id: 10, name: "Cable HDMI 4K", price: 1500, imgSrc: "/assets/hdmi.jpg" },
  { id: 11, name: "Router Wi-Fi 6", price: 25000, imgSrc: "/assets/router.jpg" },
  { id: 12, name: "Mouse Pad", price: 4000, imgSrc: "/assets/mousepad.jpg" },
];

export const useProductList = () => {
  const [products, setProducts] = useState(defaultProducts);

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return { products, addProduct };
};
