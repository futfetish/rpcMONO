import { RegisterForm } from "@/features/registerForm";
import { FC } from "react";
import Styles from '@/styles/authForm.module.scss'

const Register : FC = () => {
    return (
        <div className={Styles.box}>
            <h1>Регистрация</h1>
            <RegisterForm />
        </div>
    )
}

export default Register