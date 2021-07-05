import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addBreed } from '../../actions/index'
import TemperamentTags from '../TemperamentTags';
import s from './index.module.css';
const classNames = require("classnames");


function AddBreed({ addBreed, temperaments, tags_temps } ) {

  // State to post
  const [input, setInput] = React.useState({
      name: '',
      height: '',
      weight_show: '',
      weight: '',
      years: '',
      temperament: [],
      image: ''
  });
  
  
  // State to manage errors
  const [errors, setErrors] = React.useState({});

  // Validator function for required fields
  function validate(input) {
    let errors = {};
    
    const regRange = /\d\s-\s\d/;

    if(!input.name) {
      errors.name = 'Name is required';
    } else if(!input.height || !regRange.test(input.height)) {
      errors.height = "Height is required. Insert range, for example: '30 - 60'";
    } else if(!input.weight_show || !regRange.test(input.weight_show)) {
      errors.weight_show = "Weight is required. Insert range, for example: '6 - 12'";
    } else {
      if (tags_temps.length < 1) {
        errors.temperament = 'Temperament is required. You must add at least one tag';
      } else if (!input.years || !regRange.test(input.years)) {
        errors.years = "Years is required. Insert range, for example: '10 - 16'";
      }
    }
    return errors;
  }


  // From temperament name to ids for sending it properly in the post method
  function nameToId (tags_temps) {
    let temp = []
    tags_temps.forEach( e => {
        temperaments.map(t => t.name === e ? temp.push(t.id) :  null)
    })
    return temp
  }

  let array = nameToId(tags_temps)


  // Function to manage inputs to post 
  function handleChange(e) {
    const { name, value } = e.target  
    
    setErrors(validate({
      ...input,
      [name]: value
    }))


    setInput({
      ...input,      
      [name]: value
    }) 
  }   

  // Changes the input.temperament when a tag is modified
  useEffect(() => {
    // Get the average weight with the weight provided
    let weightAvg = input.weight_show.split(' - ');
    weightAvg = (parseInt(weightAvg[0]) + parseInt(weightAvg[1])) / 2
    // Update the state with the temperaments and weight included
    setInput({
      ...input,
      temperament: array,
      weight: weightAvg
    }) 
  }, [tags_temps]) // eslint-disable-line
  
  
  // Function to enable submit button
  const val = validate(input);
  const isEnable = (!val.name && !val.height && !val.weight_show && !val.temperament && !val.years && !val.image)


  // Function to reset the form
  function resetForm () {
    setInput({ name: '', height: '', weight_show: '', years: '', temperament: [], image: '' })
    document.getElementById('form').reset()
  }



 // Function to submit the form
  function handleSubmit (e) {
    addBreed(input);
    resetForm(e)
  }

  return (
    <div className = {s.back}>
      <h1 className= {s.title}>Add your own breed</h1>
      <div className = {s.container}>
        <form className= {s.formAdd} autoComplete="off" id='form' onSubmit={(e, tags_temp) => handleSubmit(e, tags_temp)}>
          <div className={s.col}>
            <div className={s.formGroup}>
              <label htmlFor='name'>Name:</label>
              <input 
                name='name' 
                type='text' 
                value={input.name}
                onChange={handleChange}
                className={`${errors.name}`} 
                placeholder='Insert the breed name'/>
              {errors.name && <p className={s.pdanger}>{errors.name}</p>}
            </div>
            <div className={s.formGroup}>
              <label htmlFor='height'>Height:</label>
              <input 
                name='height'
                type='text' 
                value={input.height}
                onChange={handleChange}
                className={`${errors.height}`} 
                placeholder="Insert min - max height"/>
              {errors.height && (<p className={s.pdanger}>{errors.height}</p>)}
            </div>
            <div className={s.formGroup}>
              <label htmlFor='weight_show'>Weight:</label>
              <input 
                name='weight_show'
                type='text'
                value={input.weight_show}
                onChange={handleChange}
                className={`${errors.weight_show}`} 
                placeholder="Insert min - max weight"/>
              {errors.weight_show && (<p className={s.pdanger}>{errors.weight_show}</p>)}
            </div>
            <div className={classNames(s.formGroup, s.formTags)}>
              <label htmlFor='temperaments' >Temperaments:</label>
              <TemperamentTags />
              {errors.temperament && (<p className={s.pdanger}>{errors.temperament}</p>)}
            </div>
            <div className={s.formGroup}>
              <label htmlFor='years'>Years:</label>
              <input 
                name='years'
                type='text' 
                value={input.years}
                onChange={handleChange} 
                className={`${errors.years}`}
                placeholder="Insert the breed life span"/>
                {errors.years && (<p className={s.pdanger}>{errors.years}</p>)}
            </div>
            <div className={s.formGroup}>
              <label htmlFor='image'>Image (url):</label>
              <input 
                name='image'
                type='url' 
                value={input.image}
                onChange={handleChange}
                placeholder= "Insert url to a breed's image"/>
            </div>
          </div>
          <div className={s.col}>
            <div className={classNames(s.formGroup, s.right)}> 
              <input className={s.btnForm} type='submit' disabled={!isEnable} value='Add breed!'/>
            </div>
          </div>          
        </form>
      </div>
    </div>
  )
}


  function mapStateToProps(state) {
    return {
      temperaments: state.temperaments,
      tags_temps: state.tags_temps
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
        addBreed: function (dog) {
          dispatch(addBreed(dog))
        }
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(AddBreed);