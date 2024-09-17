import { RegisterForm } from "@/features/auth/registerForm";
import { FC } from "react";
import Styles from "@/styles/authForm.module.scss";

const Register: FC = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.box}>
        <h1>Регистрация</h1>
        <div className={Styles.form}>
          <RegisterForm />
        </div>
        
      </div>
    </div>
  );
};

export default Register;
