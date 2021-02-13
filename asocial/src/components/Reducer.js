export const initialState = {
    user: null,
};
export const actionTypes ={
    SET_USER: "SET_USER",
    LOGOUT_SUCCESS:"LOGOUT_SUCCESS"
}
const reducer = (state,action) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.SET_USER:
            return{
                ...state,
                user: action.user,
            };
        case actionTypes.LOGOUT_SUCCESS:
            return{
                ...state,
                user: action.user,
            };
          default:
              return state;  
    }
}

export default reducer;