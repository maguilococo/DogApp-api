import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import s from './index.module.css';
import { getBreedById } from '../../actions'
import { FaRegTimesCircle } from 'react-icons/fa';

function BreedDetail({breed_detail, getBreedById, match }) {
    
  // Get the dog info by the params id
    useEffect(() => {
        const idRaza = match.params.idRaza;
        getBreedById(idRaza);
    },[]); // eslint-disable-line
    
    // Renders the required details of the selected breed
    return(
        <div className={s.back}>
          <div className={s.container}>
            <div className={s.cover} style={{backgroundImage: `url(${breed_detail.image})`}}></div>
            <div className={s.content}>
            <div className={s.close}>
              <Link to='/breeds'><FaRegTimesCircle /></Link></div>
              <div className={s.titles}>
                <h2 className={s.title}>{breed_detail.name}</h2>
                <h3 className={s.subtitle}>{breed_detail.temperament}</h3>
              </div>
              <div className={s.info}>
                <span>Height: </span>
                <h3>{breed_detail.height} inches</h3>
              </div>
              <div className={s.info}>
                <span>Weight: </span>
                <h3>{breed_detail.weight_show} pounds</h3>
              </div>
              <div  className={s.info}>
                <span>Life-span: </span>
                <h3>{breed_detail.years}</h3>
              </div>
            </div>
          </div>
        </div>
    )
};

  
const mapStateToProps = (state) => ({
    breed_detail: state.breed_detail
  });
  
  
  function mapDispatchToProps(dispatch) {
    return {
        getBreedById: function (idRaza) {
        dispatch(getBreedById(idRaza));
      },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(BreedDetail);