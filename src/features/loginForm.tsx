import { NamePasswordForm } from "@/components/namePasswordForm";
import { AuthStore } from "@/store/authStore";
import { FC } from "react";

export const LoginForm : FC = () => {
    const loginFunc = AuthStore((state) => state.login)
    return <NamePasswordForm callBack={loginFunc} />
}