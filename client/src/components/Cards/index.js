import React , { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllBreeds } from '../../actions/index';
import DogCard from '../DogCard';
import Pagination from '../Pagination';
import s from './index.module.css';

function Cards({ breeds, filters, filter_temp, getAllBreeds }) {


  useEffect(() => {
    // If not breeds fill the global state
    display().length < 1 && getAllBreeds();
  },[]) // eslint-disable-line

  /* This function will let us know which array to display
    --> breeds redux state / ---> new array filtered */
  const display = function() {
    
    // This function checks if all elements in an array are comtaomed in another array and will be handy when filtering by temps
    let checker = (arr, target) => target.every((v => arr.includes(v)));

     // If both filters selected
    if(filter_temp.length > 0 && filters.length > 0) {
      
      let filtered = []
      // Iterate through all breeds, and if temperament included, we pass checker function with the array of all temperaments and push it to empty array
      for (let i = 0; i < breeds.length; i++) {
        if (breeds[i].temperament && checker(breeds[i].temperament, filter_temp)){
          filtered.push(breeds[i])  
        }
      }      
      // Filter from recently-filled array according to filter value passed
      switch(filters) {
        case 'api': 
        return filtered.flat().filter(e => e.id.length < 4)
        case 'db':
          return filtered.flat().filter(e => e.id.length > 4)
        default:
          return filtered.flat()
      }

    }
    // If only filter by temperaments
    if (filter_temp.length > 0) {
      let result = [];
      for (let i = 0; i < breeds.length; i++) {
        if (breeds[i].temperament && checker(breeds[i].temperament, filter_temp)){
          result.push(breeds[i]);
        }
      }
      return result.flat();
    }
    // If filter by api/db/all selected
    if (filters.length > 0) {
      switch(filters) {
        case 'api': 
          let filt = breeds.filter(e => e.id.length < 4)
          return filt;
        case 'db':
          let fil = breeds.filter(e => e.id.length > 4)
          return fil;
        default:
          return breeds;
      }
    } 
    // If no filters selected display all
    return breeds;
  }


  // Determine which dogs to render according to pagination

  // Local state to set current page
  const [currentPage, setCurrentPage] = useState(1);
  // Local state to set dogs per page
  const [dogsPerPage] = useState(8);
  
  // Get the dogs to display according to the actual page
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = display().slice(indexOfFirstDog, indexOfLastDog); 

  // Function to move page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // In cards component we display all dog cards passing the necessary information
  // Also, we render the pagination, sending by params the data to change page and display numbers
  return (
      <div className={s.main}>
        <div className={s.gallery}>
          {display().length < 1? <h2>No breed matches the search</h2>: currentDogs.map(e => (
              <DogCard
                id = {e.id}
                name = {e.name}
                image = {e.image}
                weight = {e.weight_show}
                temperament = {e.temperament}
                key = {e.id}
              />
            ))
        }
        </div>
        <Pagination  
          dogsPerPage = {dogsPerPage}
          totalDogs = {display().length}
          paginate = {paginate} 
          currentPage = {currentPage}
        />
      </div>
    )
  };
  
  const mapStateToProps = (state) => ({
    breeds: state.breeds,
    filters: state.filters,
    filter_temp: state.filter_temp
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      getAllBreeds: function() {
        dispatch(getAllBreeds());
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Cards);