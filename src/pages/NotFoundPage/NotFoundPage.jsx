import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.notFoundContainer}>
      <h1 className={css.header}>Sorry, page not found...</h1>
      <p className={css.errorType}>404</p>
    </div>
  );
};

export default NotFoundPage;
