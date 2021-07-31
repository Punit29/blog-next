import Link from 'next/link';
import Head from 'next/head';
import Cookies from 'universal-cookie';
import router, { useRouter } from 'next/router';
import styles from './Header.module.css';

const handleLogout = () => {
  const cookies = new Cookies();
  cookies.remove('jwtToken');
  cookies.remove('userId');
  localStorage.setItem('isLogged', false);
  router.push(`/`);
};
const handleHomeRoute = (setUrl) => {
  setUrl('https://blogged-for-you.herokuapp.com/api/all-posts/');
};
export default function Header({ setUrl }) {
  const Router = useRouter();

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <title> Blog </title>
        <link rel="icon" href="/images/logo.svg" type="image/icon type" />
      </Head>

      <header>
        <h1>
          {' '}
          BLOG
        </h1>

        <div className={styles.navigation}>
          <span className={styles.navAlink}>
            {Router.asPath !== '/' ? (
              <Link href="/">Home</Link>
            ) : (
              <button type="button" onClick={() => handleHomeRoute(setUrl)}>
                Home
              </button>
            )}
          </span>

          {localStorage.getItem('isLogged') === 'true' ? (
            <>
              <span className={styles.navAlink}>
                <Link href="/user/newArticle"> New Article </Link>
              </span>

              <span className={styles.navAlink}>
                <button type="button" onClick={handleLogout}>
                  {' '}
                  Logout{' '}
                </button>
              </span>
            </>
          ) : (
            <>
              <span className={styles.navAlink}>
                <Link href="/user/login">
                  <a>Log In </a>
                </Link>
              </span>
              <span className={styles.navAlink}>
                <Link href="/user/register">
                  <a>Register </a>
                </Link>
              </span>
            </>
          )}
        </div>
      </header>
    </>
  );
}