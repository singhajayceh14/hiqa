import styles from '@/styles/Components/Auth/Login.module.scss';
const LeftSection = () => {
  return (
    <div className={styles.login_left_bk}>
      <div className={styles.login_left_container}>
        <img className={styles.loginLogo} src="/assets/images/logo.png" alt="logo" />
      </div>
    </div>
  );
};

export default LeftSection;
