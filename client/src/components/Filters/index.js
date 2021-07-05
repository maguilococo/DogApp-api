import React , { useEffect }  from 'react';
import { connect } from 'react-redux';
import { filterApi, filterByTemp } from '../../actions/index';
import TemperamentTags from '../TemperamentTags';
import SearchBar from '../SearchBar';
import s from './index.module.css';

function Filters({ tags_temps, filterApi, filterByTemp }) {

  // Local state to display the temperament bar or hide it
  const [tempBar, setTempBar] = React.useState(false);

  // If there was a change in temperaments tags bar, we change the global state
  useEffect(() => {
    filterByTemp(tags_temps)
  }, [tags_temps]) // eslint-disable-line

 // In this component we pass the filter function to get the option selected
  return (
        <div>
          <div className={s.wrapper}>
            <div className = {s.filtersNav}>
              <div className={s.items} >
                <span className={s.item} onClick={() =>{
                  filterApi('all');
                  setTempBar(false);
                  }}>All</span>
                
                <span className={s.item} onClick={(e) =>{
                  filterApi('api');
                  setTempBar(false);
                  }}>Classics</span>
                
                <span className={s.item} onClick={() => {
                  filterApi('db');
                  setTempBar(false);
                }}>New</span>              
                <span className={s.item} onClick={()=>setTempBar(true)}>
                  Temperaments</span>
              </div>
            </div>
            <div className={tempBar ? s.tempBar : s.nonBar}>
                <TemperamentTags/>
            </div>
            <div className={s.serarchBar}>
              <SearchBar/>
            </div>
          </div>
        <div>          
      </div>
    </div>
       
    )
  };
  
  const mapStateToProps = (state) => ({
    tags_temps: state.tags_temps
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      filterApi: function (filters) {
        dispatch(filterApi(filters))  
      },
      filterByTemp: function (tags) {
        dispatch(filterByTemp(tags))
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Filters);