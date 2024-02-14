import { LoginForm } from "@/features/loginForm";
import { FC } from "react";
import Styles from "@/styles/authForm.module.scss";

const Login: FC = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.box}>
        <h1>Вход</h1>
        <div className={Styles.form}>
          <LoginForm />
        </div>
        
      </div>
    </div>
  );
};

export default Login;
