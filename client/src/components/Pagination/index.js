import React from 'react';
import s from './index.module.css'
import { FaAngleLeft,  FaAngleRight} from 'react-icons/fa';
const classNames = require("classnames");

export default function Pagination({ dogsPerPage, totalDogs, paginate, currentPage } ) {
    const pageNumbers= [];

    // Get all the numbers our page will have
    for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={s.pagination}>
            <ul>
                {/* Previous page button */}
                <li className={classNames(s.btn, s.prev)} key = {-1}><span onClick={(e) => {
                    e.preventDefault(); 
                    if (currentPage > 1) paginate(currentPage - 1)
                }}><FaAngleLeft />Prev
                </span></li>
                {/* make list of all the pages, with the function to change page*/}
                {pageNumbers.map(n => (
                    <li key = {n}><span className={ n === currentPage ? classNames(s.numb, s.active) : s.numb}  onClick={(e) => {
                        e.preventDefault(); 
                        paginate(n);}}>
                        {n}
                    </span></li>
                ))} 
                {/* Next page button */}
                <li className={classNames(s.btn, s.next)} key = {1}><span onClick={(e) => {
                    e.preventDefault(); 
                    if (currentPage < pageNumbers.length) paginate(currentPage + 1);
                    }}>Next<FaAngleRight />
                </span></li>
            </ul>
        </div>
    )
};