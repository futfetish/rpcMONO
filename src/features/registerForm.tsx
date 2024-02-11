import { NamePasswordForm } from "@/components/namePasswordForm";
import { AuthStore } from "@/store/authStore";
import { FC } from "react";

export const RegisterForm : FC = () => {
    const registerFunc = AuthStore((state) => state.register)
    return <NamePasswordForm callBack={registerFunc} />
}