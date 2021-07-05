import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { selectedTags, getAllTemperaments } from '../../actions/index'
import s from './index.module.css';

function TemperamentTags ({ selectedTags, getAllTemperaments, temperaments } ) {

    // Get all the temperaments in the state in case it isn't full already
    useEffect(() => {
        if (!temperaments.length) getAllTemperaments()
    }, [])// eslint-disable-line

    
    // State to manage the temperaments search
    const [tags, setTags] = React.useState([])

    // Function to add tags
    function addTags (e) {   
        let {value} = e.target;
        if (value !== ''){
          let found = temperaments.find( t => t.name.toLowerCase().includes(value.toLowerCase())) 
          if (found) {
            if (!tags.includes(found.name)) {
              setTags([...tags, found.name]);
            } else {
              alert('Tag already included')
            }
          } else {
            alert("It doesn't match any existing temperament")
          }
          e.target.value = '';  
        }   
      } 


    // Function to delete tags
    function deleteTags (indexDelete) {
        setTags(tags.filter((t, index) => index !== indexDelete))
    }

    // Update the redux state when something is added to the local react state
    useEffect(() => {
      selectedTags(tags)
  }, [tags])// eslint-disable-line

    return(
        <div className={s.tagsInput}>
            <ul id={s.tags}>
            {tags.length > 0 && tags.map( (tag, index) =>
                <li key = {index} className={s.tag}>
                  <span key={index} className={s.tagTitle}>{tag}</span>
                  <span onClick = {() =>deleteTags(index)} className={s.tagClose}>x</span>
                </li>
            )}
            </ul>
            <input
                type='text'
                onKeyUp= {e => e.key === 'Enter' ? addTags(e) : null}
                name='temperament'
                autoComplete="off"
                placeholder='Press enter to add temperament tag'
                className={s.formTag}
            />
        </div>
    )
}

function mapStateToProps(state) {
    return {
      temperaments: state.temperaments
    }
  }

function mapDispatchToProps(dispatch) {
    return {
        getAllTemperaments: function() {
            dispatch(getAllTemperaments());
        },
        selectedTags: function(tags) {
            dispatch(selectedTags(tags));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemperamentTags);