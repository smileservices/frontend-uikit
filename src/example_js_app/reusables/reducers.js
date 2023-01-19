export const formReducer = (state, action) => {

    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.name]: action.payload.value
                },
            };
        case "FORM_ERROR":
            return {
                ...state,
                errors: action.payload
            }
        case "CLEAR_ERRORS":
            return {
                ...state,
                errors: {}
            }
        default:
            return state;
    }
}