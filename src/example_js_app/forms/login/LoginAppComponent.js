import React, {useReducer} from "react"

import {formReducer} from "../../reusables/reducers"
import {FormElement, formSubmitReducer, SUBMIT_FORM_STATE} from "../../reusables/forms/forms";
import LoginForm, {validateLoginForm, FORM_INITIAL_STATE} from "./login_form";

function dummyPost(URL, data, dispatchForm, dispatchData) {
    // this is a function to be implemented and that would handle all parts of the post request
    // the signature should be the same for the standard forms and data
    dispatchForm({type: "START"});
    setTimeout(() => {
        alert("Post happened, check out the console");
        console.log("form data posted to", URL, data);
        if (data.submit_error) {
            console.error("submit error!")
            dispatchForm({type: "ERROR", payload: "Oh no, post error"});
            dispatchData({type: "FORM_ERROR", payload: {submit_error: "Just uncheck this"}});
        } else {
            console.info("submit success!")
            dispatchForm({type: "SUCCESS", payload: {message: "The form was posted successfully.", data: {}}});
        }
    }, 5000);
}

export default function LoginApp() {
    const [formState, dispatchForm] = useReducer(formSubmitReducer, SUBMIT_FORM_STATE);
    const [formData, dispatchData] = useReducer(formReducer, FORM_INITIAL_STATE);

    let submitCallback = () => {
        const errors = validateLoginForm(formData.data);
        console.log(errors);
        if (errors) {
            dispatchData({type: "FORM_ERROR", payload: errors});
        } else {
            dispatchData({type: "CLEAR_ERRORS"});
            // we let the post function to trigger the dispatches
            dummyPost("create.something.com", formData.data, dispatchForm, dispatchData);
        }
    }

    return (
        <FormElement formState={formState} callback={submitCallback}>
            <div className="header">
                <h3>Login</h3>
                <p>Use social login or username and password.</p>
            </div>
            {LoginForm(formData, dispatchData)}
        </FormElement>
    );
}