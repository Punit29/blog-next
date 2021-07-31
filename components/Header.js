import Head from 'next/head';

export default function Header() {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <title> Blog </title>
      </Head>
      <header>
        <h1>
          {' '}
          BLOG
        </h1>
      </header>
    </>
  );
}