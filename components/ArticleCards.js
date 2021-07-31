import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import styles from './ArticleCards.module.css';

export default function ArticleCards({ article, handleDelete }) {
  const editArticle = (e) => {
    e.preventDefault();
    router.push(`/user/edit/${article.id}`);
  };

  const deleteArticle = async (e) => {
    e.preventDefault();
    handleDelete(article.id, article.title);
  };

  return (
    <div className={styles.articleSection}>
      <div>

        <h3>
          {' '}
          <Link href={`/posts/${article.id}`}>
            <a>{article.title} </a>
          </Link>
        </h3>
      </div>
      <div>
        <span>
        </span>
        &nbsp;|&nbsp;
        {/* <span> {article.userTable.name} </span> */}
        {localStorage.getItem('isLogged') === 'true' ? (
          <div>
            <button className={styles.spanBtn} type="button" name="edit" onClick={(e) => editArticle(e)}>
              <span> Edit </span>
            </button>
            |
            <button className={styles.spanBtn} type="button" name="delete" onClick={(e) => deleteArticle(e)}>
              <span> Delete </span>
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}