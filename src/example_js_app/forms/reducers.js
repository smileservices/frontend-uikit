export const FORM_INITIAL_STATE = {
    data: {
        name: "",
        description: "",
        select: [],
        submit_error: false
    },
    errors: {}
}

export const SUBMIT_FORM_STATE = {
    response: {},
    waiting: false,
    error: false,
}

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
        default:
            return state;
    }
}

export const formSubmitReducer = (state, action) => {
    switch (action.type) {
        case "START":
            return {
                waiting: true,
                error: false,
                data: {}
            }
        case "SUCCESS":
            return {
                waiting: false,
                error: false,
                data: action.payload
            }
        case "ERROR":
            return {
                waiting: false,
                error: action.payload,
                data: {}
            }
        default:
            return state;
    }
}