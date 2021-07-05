import React from 'react';
import { NavLink } from 'react-router-dom';
import {FaTimes} from 'react-icons/fa';
import s from './index.module.css';
const classNames = require("classnames");

export default function SideMenu({ mobile, isMobile }) {

    // This component renders the side menu
    return (
        <aside className={mobile ? classNames(s.container, s.mob) : classNames(s.container, s.nav)}>
            <div className={s.icon} onClick={isMobile}>
                <FaTimes/>
            </div>
            <ul className={s.menu}>
                <NavLink to="/breeds" onClick={isMobile} className={s.link} activeClassName={s.active}>Home</NavLink>
                <NavLink to="/addBreed" onClick={isMobile} className={s.link} activeClassName={s.active}>Add your own</NavLink>
            </ul>
        </aside>
    )

}