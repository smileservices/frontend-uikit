import Waiting from "../../components/Waiting";
import Alert from "../../components/Alert";
import React from "react";
import {makeId} from "../../components/utils";
import {bool} from "prop-types";

export function FormElement({callback, formState, buttonText = false, children}) {
    if (formState.waiting) return (<Waiting text="Posting..."/>);

    function buildAlert(error) {
        if (!Boolean(error)) {
            return "";
        }
        const alertText = error;
        return (<Alert
            key={makeId()}
            text={alertText} type="danger"
            stick={true}
            hideable={false}
        />)
    }

    return (
        <form onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            callback();
            // window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
            {children}
            {buildAlert(formState.error)}
            <div className="buttons-container">
                <button type="submit" className="btn light submit">{buttonText ? buttonText : 'Submit'}</button>
            </div>
        </form>
    )
}