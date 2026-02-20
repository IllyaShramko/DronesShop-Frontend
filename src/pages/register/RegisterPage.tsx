import styles from "./register.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function RegisterPage({ isOpen, onClose }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.backgroundColor = "#CDD5DD";
    return () => {
      document.body.style.backgroundColor = "#ffffff";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleCancel() {
    onClose();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isRegister) {
    } else {
    }
    onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.tabs}>
            <span
              className={!isRegister ? styles.active : ""}
              onClick={() => setIsRegister(false)}
            >
              Авторизація
            </span>
            <span
              className={isRegister ? styles.active : ""}
              onClick={() => setIsRegister(true)}
            >
              Реєстрація
            </span>
          </div>

          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {isRegister && (
            <div className={styles.group}>
              <label>Ім&apos;я</label>
              <input name="name" type="text" placeholder="Введіть ім'я" />
            </div>
          )}

          <div className={styles.group}>
            <label>Email</label>
            <input name="email" type="email" placeholder="Введіть email" />
          </div>

          <div className={styles.group}>
            <label>Пароль</label>
            <input name="password" type="password" placeholder="Введіть пароль" />
          </div>

          {isRegister && (
            <div className={styles.group}>
              <label>Підтвердження пароля</label>
              <input
                name="passwordConfirm"
                type="password"
                placeholder="Повторіть пароль"
              />
            </div>
          )}

          <div className={styles.buttons}>
            <button type="button" className={styles.secondary} onClick={handleCancel}>
              СКАСУВАТИ
            </button>
            <button type="submit" className={styles.primary}>
              {isRegister ? "ЗАРЕЄСТРУВАТИСЯ" : "УВІЙТИ"}
            </button>
          </div>

          <p className={styles.policy}>
            При вході або реєстрації, я підтверджую згоду з умовами{" "}
            <a href="#">публічного договору</a>
          </p>
        </form>
      </div>
    </div>
  );
}