import React, {useReducer} from "react"
import ReactDOM from "react-dom";

import {formReducer} from "../reusables/reducers"
import {FormElement, formSubmitReducer, SUBMIT_FORM_STATE} from "../reusables/forms/forms";
import {dummyPost} from "../apiInterface";
import ImageForm, {FORM_INITIAL_STATE, normalizeImageForm} from "./image_form";

function ImageFormApp() {
    const [formState, dispatchForm] = useReducer(formSubmitReducer, SUBMIT_FORM_STATE);
    const [formData, dispatchData] = useReducer(formReducer, FORM_INITIAL_STATE);
    const normalized = normalizeImageForm(formData.data);
    let submitCallback = () => {
        dummyPost("create.something.com", normalized, dispatchForm, dispatchData);
    }

    return (
        <FormElement formState={formState} callback={submitCallback}>
            {ImageForm(formData, dispatchData)}
        </FormElement>
    );
}

ReactDOM.render(<ImageFormApp/>, document.getElementById('image-forms'));
