import Image from 'next/image';
import marked from 'marked';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Header from '../../components/MainHeader';
import styles from '../../styles/[id].module.css';

export default function Article() {
  const Router = useRouter();
  const path = Router.asPath;
  const url = `https://blogged-for-you.herokuapp.com/api/${path}`;
  
  const { data, error } = useSWR(url);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const article = data;

  return (
    <>
      <Header />
      <div className={styles.readArticle}>
        <h2>{article.title.toUpperCase()}</h2>
        <div className="center">
          by &nbsp;
          <span> {article.userTable.name.toUpperCase()} </span>
        </div>

        <p dangerouslySetInnerHTML={{ __html: marked(article.markdown) }} />
        <Link href="/">
          <a className="center">
            <span>
              <FaArrowLeft />
            </span>{' '}
            &nbsp; Back to home page
          </a>
        </Link>
      </div>
    </>
  );
}
