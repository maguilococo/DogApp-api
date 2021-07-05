import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllBreeds, getBreedByName } from '../../actions/index';
import { FaSearch } from 'react-icons/fa';
import s from './index.module.css';

function SearchBar({ getBreedByName, breeds  }) {

  // Get all the breeds in the state in case it isn't full already
  useEffect(() => {
    if (!breeds.length) getAllBreeds()
  }, []) // eslint-disable-line

  // React state for the name input for search
  const [name, setName] = React.useState('');
  
  // set local state and go searching with the input (no button search)
  function handleChange (e) {
      setName(e.target.value);
      getBreedByName(e.target.value);
  }

  return (
      <div className={s.searchBox}>
          <input
              className={s.searchText}
              type="text"
              autoComplete="off"
              value={name}
              onInput={(e) => handleChange(e)}
              placeholder='Type any breed name'
          />
          <FaSearch className={s.searchIcon}/>
      </div>
  )
};

const mapStateToProps = (state) => ({
  breeds: state.breeds,
  display_breeds: state.display_breeds
});

function mapDispatchToProps(dispatch) {
    return {
      getAllBreeds: function() {
        dispatch(getAllBreeds())
      },
      getBreedByName: function(name) {
        dispatch(getBreedByName(name))
      }
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);