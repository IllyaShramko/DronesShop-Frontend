import { useState } from "react";
import styles from "./register-block.module.css";


type Props = {
  onClose: () => void;
};

export function RegisterBlock({ onClose }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>×</button>

        <h2 className={styles.title}>
          Авторизація / <span>Реєстрація</span>
        </h2>

        <label>
          Імʼя
          <input type="text" placeholder="Введіть імʼя" />
        </label>

        <label>
          Email
          <input type="email" placeholder="Введіть email" />
        </label>

        <label>
          Пароль
          <div className={styles.passwordField}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Введіть пароль"
            />
            <span onClick={() => setShowPassword(!showPassword)}>👁</span>
          </div>
        </label>

        <label>
          Підтвердження пароля
          <div className={styles.passwordField}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Повторіть пароль"
            />
            <span onClick={() => setShowConfirm(!showConfirm)}>👁</span>
          </div>
        </label>

        <p className={styles.login}>
          Вже є акаунт? <a href="#">Увійти</a>
        </p>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            СКАСУВАТИ
          </button>
          <button className={styles.submit}>
            ЗАРЕЄСТРУВАТИСЯ
          </button>
        </div>
      </div>
    </div>
  );
}
