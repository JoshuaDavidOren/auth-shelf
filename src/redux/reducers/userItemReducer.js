const userItemReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER':
            return state = [...state, action.payload];
        default:
            return state;
    };
  };

  export default userItemReducer;