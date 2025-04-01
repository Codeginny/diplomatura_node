// src/hooks/useProductList.js
import { useState } from "react";

const defaultProducts = [
  { id: 1, name: "Notebook", price: 450000, imgSrc: "https://philco.com.ar/media/catalog/product/cache/c8f6a96bef9e9f64cd4973587df2520f/n/1/n14p4020_7.jpg" },
  { id: 2, name: "Mouse Inalámbrico", price: 15000, imgSrc: "https://www.precio-calidad.com.ar/wp-content/uploads/2021/07/LOGITECH-M187-VERDE-AZULADO-910-005363-2.jpg" },
  { id: 3, name: "Teclado Rosa", price: 32000, imgSrc: "https://spacegamer.com.ar/img/Public/1058-producto-2-4599.jpg" },
  { id: 4, name: "Monitor 24' Full HD", price: 120000, imgSrc: "https://noblex.com.ar/media/catalog/product/cache/c8f6a96bef9e9f64cd4973587df2520f/n/o/noblex_pop_digital_-_bruno_v2_mk24x7100pi_monitor.jpg" },
  { id: 5, name: "Auriculares Bluetooth", price: 25000, imgSrc: "https://acdn-us.mitiendanube.com/stores/004/060/419/products/auriculares_1-321992d5a6f0beedde17325705533835-1024-1024.jpg" },
  { id: 6, name: "Parlante Bluetooth", price: 18000, imgSrc: "https://www.cetrogar.com.ar/media/catalog/product/p/s/psb100p_foto_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:" },
  { id: 7, name: "Webcam HD", price: 7000, imgSrc: "https://www.genesiohogar.com.ar/theme/imagenes/productos/gf-1891-717476.jpg" },
  { id: 8, name: "Cargador Rápido", price: 3000, imgSrc: "https://http2.mlstatic.com/D_NQ_NP_615351-MLA79439076548_102024-O.webp" },
  { id: 9, name: "Memoria SSD", price: 45000, imgSrc: "https://mexx-img-2019.s3.amazonaws.com/36061_1.jpeg" },
  { id: 10, name: "Cable HDMI 4K", price: 1500, imgSrc: "https://m.media-amazon.com/images/I/61pk77kq1sL.jpg" },
  { id: 11, name: "Router Wi-Fi 6", price: 25000, imgSrc: "https://sofmat.com.bo/wp-content/uploads/2024/07/Router-Wi-Fi-6-Archer-AX10-3.jpg" },
  { id: 12, name: "Mouse Pad", price: 4000, imgSrc: "https://zebronics.com/cdn/shop/products/Zeb-Mouse-Pad-pic1.jpg?v=1623503729" },
];


export const useProductList = () => {
  const [products, setProducts] = useState(defaultProducts);

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return { products, addProduct };
};
