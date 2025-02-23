import Head from 'next/head';
import '../styles/index.css';  // Estilos globales
import '../styles/app.module.css';  // Estilos específicos

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sweet Donut - Donas Artesanales y Deliciosas</title>
        <meta name="description" content="Bienvenidos a Sweet Donut, tu lugar favorito para disfrutar de las mejores donas artesanales, frescas y deliciosas." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Lilita+One&display=swap" rel="stylesheet" />
      </Head>

      {/* Renderiza la página actual con sus props */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;