import '../styles/index.css';  // Global CSS
import '../styles/app.module.css';  // CSS específico del módulo
import Head from 'next/head';    // Si necesitas modificar la cabeza de la página

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sweet Donut - Donas Artesanales y Deliciosas</title>
        <meta name="description" content="Bienvenidos a Sweet Donut, tu lugar favorito para disfrutar de las mejores donas artesanales, frescas y deliciosas." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Agregar iconos o fuentes de Google si lo necesitas */}
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Lilita+One&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Aquí puedes agregar tus configuraciones globales */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
