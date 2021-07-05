import React from 'react';
import { connect } from 'react-redux';
import { sort } from '../../actions/index';
import s from './index.module.css';

// This component renders the sort selection menu and executes the sort action with the option selected

function Orders({ breeds, orders, sort }) {

    return (
      <div className={s.selectNav}>
          <div className={s.selectMenu}>
            <select name="filters" id="filters" value={orders} onChange={e => sort(breeds, e.target.value)} >
            <option value="" disabled hidden>Sort</option>
              <optgroup label="Alphabetic">
                <option value="al-asc">A - Z</option>
                <option defaultValue value="al-desc" >Z - A</option>
              </optgroup>   
              <optgroup label="Weight">
                <option value="w-asc">Asc</option>
                <option value="w-desc">Desc</option>
              </optgroup> 
            </select>
         </div> 
        </div> 
       
    )
  };
  
  const mapStateToProps = (state) => ({
    orders: state.orders,
    breeds: state.breeds
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      sort: function (breeds, orders) {
        dispatch(sort(breeds, orders))  
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Orders);