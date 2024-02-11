import { FC, useState } from "react";

interface props {
    callBack : (name : string, password : string) => void
} 

export const NamePasswordForm : FC<props> = ({callBack}) => {
    const [name , setName] = useState('')
    const [password , setPassword] = useState('')
    const onClickFunc = () => {
        callBack(name , password)
        setName('')
        setPassword('')
    }

    return (
        <div>
            <input type="text" value={name} placeholder="name" onChange={(e) => setName(e.currentTarget.value)} />
            <input type="text" value={password} placeholder="password"  onChange={(e) => setPassword(e.currentTarget.value)} />
            <button onClick={() => onClickFunc()}> submit </button>
        </div>
    )
    
}