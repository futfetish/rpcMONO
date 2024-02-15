import { MyButton } from "@/UI/myButton/myButton";
import { MyInput } from "@/UI/myInput/myInput";
import { FC, useState } from "react";
import Styles from './namePassword.module.scss'

interface props {
    callBack : (name : string, password : string) => void
    nameError : string
    passwordError : string
} 

export const NamePasswordForm : FC<props> = ({callBack , nameError , passwordError}) => {
    const [name , setName] = useState('')
    const [password , setPassword] = useState('')
    const onClickFunc = () => {
        callBack(name , password)
        setName('')
        setPassword('')
    }

    return (
        <div className={Styles.box}>
            <MyInput placeholder={'name'} value={name} onChange={setName} error={nameError} />
            <MyInput placeholder={'password'} value={password} onChange={setPassword} error={passwordError} />
            <MyButton onClick={() => onClickFunc()}> submit </MyButton>
        </div>
    )
    
}