import Waiting from "../Waiting";
import Alert from "../Alert";
import React from "react";
import {makeId} from "../utils";

export const SUBMIT_FORM_STATE = {
    response: {},
    waiting: false,
    error: false,
    success: false,
}

export const formSubmitReducer = (state, action) => {
    switch (action.type) {
        case "START":
            return {
                waiting: true,
                error: false,
                success: false,
                data: {}
            }
        case "SUCCESS":
            return {
                waiting: false,
                error: false,
                success: action.payload.message,
                data: action.payload.data,
            }
        case "ERROR":
            return {
                waiting: false,
                success: false,
                error: action.payload,
                data: {}
            }
        default:
            return state;
    }
}

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
                <button type="submit" className="btn">{buttonText ? buttonText : 'Submit'}</button>
            </div>
        </form>
    )
}