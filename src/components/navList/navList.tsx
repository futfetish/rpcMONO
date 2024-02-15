import { NavButton } from "@/UI/navButton/navButton";
import { FC } from "react";
import Styles from './navList.module.scss'

interface pages{
    name : string
    href : string
}

const navPages : (pages & {subPages : pages[]})[] = [{ name: "ИГРА", href: `/game` , subPages : [{name : 'test' , href: '/test'}] } ,{ name: "ИГРОКИ", href: `/users` , subPages : [{name : 'лучшие игроки' , href: '/users/top'}] }  ] ;

export const NavList : FC = () => {
    return <div className={Styles.box}>
        {navPages.map((page) => (
            <NavButton key={page.name} href={page.href} subButtons={page.subPages} >{page.name}</NavButton>
        ))}
    </div>
}