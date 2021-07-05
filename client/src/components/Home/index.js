import React from 'react';
import Filters from '../Filters';
import Orders from '../Orders';
import Cards from '../Cards';
import s from './index.module.css';


// This component renders all whats required in the Home Page
export default function Home() {
    return(
        <div className = {s.home}>
            <Filters/>
            <Orders/>
            <Cards />
        </div>
    )
};