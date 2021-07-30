const itemListReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD':
            return state = [...state, action.payload];
        default:
            return state;
    };
    // if( action.type === 'ADD'){
    //   return state = [...state, action.payload];
    // }
    // return state
  };

  export default itemListReducer;