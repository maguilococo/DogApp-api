// Import actions
import { GET_ALL_BREEDS, GET_BREED_BY_ID, GET_ALL_TEMPERAMENTS,
     FILTER, ORDER, ADD_BREED, GET_BREED_BY_NAME, SELECTED_TAGS, FILTER_BY_TEMP} from '../actions/types';

// Initialize the state
const initialState = {
    breeds: [],         // all breeds - api+db
    temperaments: [],   // temperaments
    breed_detail: {},   // details from the breed by the id    
    filter_temp: [],    // filter by temperaments tags
    filters: '',        // filter by dogs from --> api / db / both
    orders: '',         // sort option --> al-asc / al-desc / w-asc / w-desc
    tags_temps: []      // temperament tags
}

// Reducer
function rootReducer (state = initialState, action) {
    switch (action.type) {
      
        case GET_ALL_BREEDS:
            return {
                ...state, breeds: action.payload};
        
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state, temperaments: action.payload};

        case FILTER:
            return {
                ...state, filters: action.payload }

        case FILTER_BY_TEMP:
            return {
                ...state, filter_temp: action.payload}
        
        case ORDER:
            return {
                ...state, breeds: action.payload.breeds, orders: action.payload.orders};
        
        case GET_BREED_BY_ID:
            return {
                ...state, breed_detail: action.payload};

        case ADD_BREED:
            return {
                ...state, add_response: action.payload};
        
        case GET_BREED_BY_NAME:
            return {
                ...state, breeds: action.payload};
        
        case SELECTED_TAGS:
            return{
                ...state, tags_temps: action.payload};

        default:
            return state;
        }
}

export default rootReducer;