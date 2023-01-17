import React, {useReducer, useEffect, Fragment, useState} from "react"

import {
    Input,
    Textarea,
    SelectReact, Checkbox,
} from "../../components/form";

export const FORM_INITIAL_STATE = {
    data: {
        name: "",
        description: "",
        select: [],
        submit_error: false
    },
    errors: {}
}

export function normalizeExampleForm(data) {
    const normalized = {...data};
    normalized.select = normalized.select.value;
    return normalized;
}

export function validateExampleForm(data) {
    if (data.select === 2) {
        return {select: "This triggers validation error."};
    }
}

function ExampleForm(state, dispatch, extraData = {}) {
    const waiting = false;

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: {name: e.target.name, value: e.target.value},
        });
    };

    const handleChangeSelect = (sel_name) => {
        return (sel) => {
            dispatch({
                type: "CHANGE_INPUT",
                payload: {name: sel_name, value: sel},
            });
        }
    };

    const handleChangeCheckbox = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: {name: e.target.name, value: e.target.checked},
        });
    };

    const selectOptions = [
        {"value": 1, "label": "no validation error"},
        {"value": 2, "label": "validation error"},
        {"value": 3, "label": "just wait"}
    ];

    return (
        <Fragment>
            <Input
                name="name"
                label="Input"
                smallText="The name of the concept"
                inputProps={{
                    value: state.data.name,
                    type: 'text',
                    disabled: Boolean(waiting),
                    required: true,
                    placeholder: "The name of someone",
                    onChange: handleChange
                }}
                error={state.errors.name}
            />
            <SelectReact
                label='Select'
                name='select'
                value={state.data.select}
                error={state.errors.select}
                options={selectOptions}
                onChange={handleChangeSelect("select")}
                smallTextUnder="Select validation error"
                isDisabled={Boolean(waiting)}
            />
            <Textarea
                name="description"
                label="Textarea"
                smallText="This text should be at least 5 chars for it to be valid"
                inputProps={{
                    value: state.data.description,
                    onChange: handleChange,
                    placeholder: "Input with validation",
                    required: true,
                    disabled: Boolean(waiting),
                    rows: 5
                }}
                error={state.errors.description}
            />
            <Checkbox
                inputProps={{checked: state.data.submit_error, onChange: handleChangeCheckbox}}
                name="submit_error"
                label="Post with error"
                smallText="Check it for post error"
                error={state.errors.submit_error}
            />
            {extraData.formElements ? extraData.formElements.get_list(state.errors) : ''}
        </Fragment>
    )
}

export default ExampleForm;