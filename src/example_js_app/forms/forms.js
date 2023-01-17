import Waiting from "../../components/Waiting";
import Alert from "../../components/Alert";
import React from "react";
import {makeId} from "../../components/utils";
import {bool} from "prop-types";

export function FormElement({callback, formState, buttonText = false, children}) {

    function buildAlert(error) {
        if (!error) {
            return "";
        }
        const alertText = error;
        return (<Alert
            key={makeId()}
            text={alertText} type="danger"
            hideable={false}
        />)
    }

    function buildSuccess(success) {
        if (!success) {
            return "";
        }
        const alertText = success;
        return (<Alert
            key={makeId()}
            text={alertText} type="success"
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
            {formState.waiting ? <div className="overlay-waiting"><Waiting text="Posting..."/></div> : ""}
            {children}
            {buildAlert(formState.error)}
            {buildSuccess(formState.success)}
            <div className="buttons-container">
                <button type="submit" className="btn light submit">{buttonText ? buttonText : 'Submit'}</button>
            </div>
        </form>
    )
}