import styles from './loading-error.module.css';

function LoadingError() {
  return (
    <div className={styles.LoadingError} >
      <p>Не удалось загрузить</p>
    </div>
  );
}

export default LoadingError;
