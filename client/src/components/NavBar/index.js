import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './index.module.css';
import { FaBars } from 'react-icons/fa';
import logo from '../../img/logo.svg'


export default function NavBar( { isMobile }) {
    // This component renders the NavBar if it is not a mobile device
    return (
        <nav>
            <NavLink to="/" className={s.logoSide} >
                <img className={s.logo} src={logo} alt='logo' />
            </NavLink>
            <div className={s.mobileMenu} onClick = {isMobile}>
                <FaBars/>
            </div>
            <div className={s.menu}>
                <NavLink to="/breeds" className={s.link} activeClassName={s.active}>Home</NavLink>
                <NavLink to="/addBreed" className={s.link} activeClassName={s.active}>Add your own</NavLink>
            </div>
        </nav>
    )
}