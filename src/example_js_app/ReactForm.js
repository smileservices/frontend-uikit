import React, {useState, useEffect, Fragment} from "react"

import {
    Input,
    Textarea,
    SelectReact, Checkbox,
} from "../components/form";
import {FormElement} from "../components/form";
import Alert from "../components/Alert";

// The ReactForm is used for both update and create operations. That's why it has validation function as a param

/*
* How it should work:
*
*  1. Fetch or populate the data on selects
*  2. User completes formoptions
*  3. User submits form
*  4. Data is normalized then validated
*  5. If validation fails, the setAlert and setErrors are called with the specific messages
*
*
* */

function ReactForm({
                       formData,
                       setFormData,
                       extraData,
                       submitCallback,
                       waiting,
                       alert,
                       errors,
                       setAlert,
                       setErrors,
                       setWaiting
                   }) {
    const [selectData, setSelectData] = useState([]);

    // here we should do fetching the select values
    useEffect(() => {
        setSelectData([
            {value: 1, label: "one option"},
            {value: 3, label: "another option"},
            {value: 6, label: "the last option"},
        ])
    }, []);


    function makeStateProps(name) {
        function updateValue(name) {
            return e => {
                let clonedFormData = {...formData};
                clonedFormData[name] = e.target.value;
                setFormData(clonedFormData);
            }
        }

        return {
            onChange: updateValue(name),
            value: formData[name]
        }
    }

    function validate(normalizedData, callback) {
        let vErr = {};
        if (normalizedData.description.length < 30) vErr.description = 'Description is too short. It has to be at least 30 characters';
        if (extraData.formElements) {
            extraData.formElements.validate(normalizedData, vErr);
        }
        setErrors(vErr);
        if (Object.keys(vErr).length > 0) {
            setAlert(<Alert close={e => setAlert(null)} text="Please fix the form errors" type="danger"/>)
            return false;
        } else {
            setAlert('');scr
        }
        callback(normalizedData);
    }

    function normalizeData(data) {
        let nd = {...data};
        return nd;
    }

    return (
        <FormElement
            data={formData}
            callback={
                formData => validate(normalizeData(formData), submitCallback)
            }
            alert={alert}
            waiting={waiting}
        >
            {extraData.formTitle ? <h3>{extraData.formTitle}</h3> : ''}

            <Input name="name" label="Input" inputProps={{
                        ...makeStateProps('name'),
                        type: 'text',
                        disabled: Boolean(waiting)
                    }}
                   smallText="The name of the concept"
                   error={errors.name}
            />
            <SelectReact label='Select'
                         name='select'
                         value={selectData ? selectData.filter(i => i.value === formData.select) : {}}
                         error={errors.select}
                         options={selectData}
                         onChange={sel => setFormData({...formData, select: sel.value})}
                         smallText="Experience level required"
                         isDisabled={Boolean(waiting)}
            />
            <Textarea name="description" label="Textareas"
                      inputProps={{
                          ...makeStateProps('description_long'),
                          placeholder: "Long Description (use markdown)",
                          required: true,
                          disabled: Boolean(waiting),
                          rows: 5
                      }}
                      smallText="Write a long description using markdown."
                      error={errors.description}
            />
            <Checkbox
                inputProps={{...makeStateProps('checkbox')}}
                name="checkbox"
                label="Checkbox"
                smallText="just a checkbox"
                error={errors.checkbox}
            />
            {extraData.formElements ? extraData.formElements.get_list(waiting, errors) : ''}
        </FormElement>
    )
}

ReactForm.contentType = 'json';
export default ReactForm;