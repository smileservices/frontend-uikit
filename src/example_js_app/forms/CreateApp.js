import React, {useReducer, useEffect, Fragment} from "react"
import ReactDOM from "react-dom";

import ExampleForm, {normalizeExampleForm, validateExampleForm} from "./example_form";
import {formSubmitReducer, formReducer, SUBMIT_FORM_STATE, FORM_INITIAL_STATE} from "./reducers"
import {FormElement} from "./forms";

function dummyPost(URL, data, dispatchForm, dispatchData) {
    console.info("putting form into wait mode");
    dispatchForm({type: "START"});
    setTimeout(() => {
        alert("Post happened, check out the console");
        console.log('posted')
        console.log("form posted to", URL, data);
        if (data.submit_error) {
            console.error("submit error!")
            dispatchForm({type: "ERROR", payload: "Oh no, post error"});
            dispatchData({type: "FORM_ERROR", payload: {submit_error: "Just uncheck this"}});
        } else {
            console.info("submit success!")
            dispatchForm({type: "SUCCESS", payload: {message: "The form was posted successfully."}});
        }
    }, 5000);
}

function CreateApp() {
    const [formState, dispatchForm] = useReducer(formSubmitReducer, SUBMIT_FORM_STATE);
    const [formData, dispatchData] = useReducer(formReducer, FORM_INITIAL_STATE);

    // console.log("app form state", formState);
    // console.log("app form data", formData);

    let submitCallback = () => {
        const normalized = normalizeExampleForm(formData.data);
        const errors = validateExampleForm(normalized);
        if (errors) {
            dispatchData({type: "FORM_ERROR", payload: errors});
        } else {
            dummyPost("create.something.com", normalized, dispatchForm, dispatchData);
        }
    }

    return (
        <FormElement formState={formState} callback={submitCallback}>
            {ExampleForm(formData, dispatchData)}
        </FormElement>
    );
}

ReactDOM.render(<CreateApp/>, document.getElementById('forms-javascript'));
