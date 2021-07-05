import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllBreeds, getAllTemperaments } from '../../actions';
import s from './index.module.css';
import { FaAngleDoubleUp } from 'react-icons/fa';

function LandPage({breeds, temperaments, getAllBreeds, getAllTemperaments }) {
  // Fill the global states as soon as the land-page is created
  useEffect(() => {
    if (!temperaments.length) getAllTemperaments()
    if (!breeds.length) getAllBreeds();
  }, []) // eslint-disable-line

    return(
    <div className={[s.main, s.flex].join(' ')}>
        <h1 className={s.title}>DOG APP</h1>
        <div className={[s.boxDescription, s.flex].join(' ')}>
          <p className={s.description}>Meet the diversity of dogs in the world</p>
        </div>
        <div className={s.swipeUp}>
          <Link to="/breeds" >
            <FaAngleDoubleUp style={{color: `whitesmoke`}}/>
            <span>Swipe up</span>
          </Link>
        </div>
      </div>
    )
};
function mapStateToProps(state) {
  return {
    temperaments: state.temperaments,
    breeds: state.breeds
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllTemperaments: function() {
      dispatch(getAllTemperaments());
    },
    getAllBreeds: function() {
      dispatch(getAllBreeds());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandPage);