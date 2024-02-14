import { NamePasswordForm } from "@/components/namePasswordForm/namePasswordForm";
import { AuthStore } from "@/store/authStore";
import { FC } from "react";

export const LoginForm : FC = () => {
    const loginFunc = AuthStore((state) => state.login)
    const error = AuthStore((state) => state.error)
    return <NamePasswordForm nameError={error && error.type === 'name' ? error._message : ''} passwordError={error && error.type === 'password' ? error._message : ''} callBack={loginFunc} />
}