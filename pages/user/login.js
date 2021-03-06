import Link from 'next/link';
import Cookies from 'universal-cookie';
import router from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import styles from '../../components/LoginAndRegister.module.css';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setUser({ email, password });
    const response = await fetch('https://blogged-for-you.herokuapp.com/api/login', {
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const userDetails = await response.json();
    if (userDetails.success) {
      const cookies = new Cookies();
      cookies.set('jwtToken', userDetails.token, { path: '/' });
      cookies.set('userId', userDetails.user.id);
      localStorage.setItem('isLogged', true);

      router.push('/');
    } else {
      toast.error(userDetails.msg, { position: toast.POSITION.TOP_CENTER, autoClose: 5000 });
    }
  };
  return (
    <>
      <Header />
      <h2> Login</h2>

      <div className={styles.pageDivide}>
        <div className={styles.leftSide}>
        </div>

        <div className={`${styles.rightSide} ${styles.login}`}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="email">
                {' '}
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.loginForm}
                  defaultValue={user.email}
                  required
                />
              </label>
            </div>

            <div>
              <label htmlFor="password">
                {' '}
                Password
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={styles.loginForm}
                  defaultValue={user.email}
                  required
                />
              </label>
            </div>

            <div className={styles.center}>
              <button type="submit" className={`${styles.btn} ${styles.blue} ${styles.loginBtn}`}>
                Login
              </button>
              <Link href="/">
                <a className={`${styles.abutton} ${styles.grey}`}>Cancel</a>
              </Link>
            </div>
          </form>
          <h5>
            <Link href="/user/register">
              <a>Need an account?</a>
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
}