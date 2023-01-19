import React, {useReducer, useEffect, Fragment, useState} from "react"
import {ImageUploadField} from "../../components/form";

import {
    Input,
    Textarea,
    SelectReact, Checkbox,
} from "../../components/form";

export const FORM_INITIAL_STATE = {
    data: {
        name: "",
        images: ["https://thumbs.dreamstime.com/t/two-yellow-ducklings-white-background-137011182.jpg"],
        submit_error: false
    },
    errors: {}
}

export function normalizeImageForm(data) {
    const normalized = {...data};
    return normalized;
}

export function validateImageForm(data) {
    return false;
}

function filesUpload(url, files, callback) {
    // upload the files to the URL and return their names
    console.log("uploading files", url)
    const uploadedFileNames = files.map(f => f.preview);
    callback(uploadedFileNames)
}

function filesDelete(url, callback) {
    //deletes the file from the URL
    console.log("making DELETE post", url);
    callback(url);
}


function ImageForm(state, dispatch) {
    const waiting = false;

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: {name: e.target.name, value: e.target.value},
        });
    };

    const handleChangeCheckbox = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: {name: e.target.name, value: e.target.checked},
        });
    };

    const handleChangeFiles = (fieldName, files) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: {name: fieldName, value: files},
        });
    };

    function filesUploadHandler(name, filesArray, callback) {
        filesUpload(
            "file/upload.url",
            filesArray,
            uploadedFilesURLS => {
                if (state.data.image_error) {
                    dispatch({type: "FORM_ERROR", payload: {images: "Error while trying to upload"}});
                } else {
                    handleChangeFiles(name, state.data.images.concat(uploadedFilesURLS));
                    callback();
                }
            }
        );
    }

    function filesDeleteHandler(name, fileDeleteURL) {
        filesDelete(
            fileDeleteURL,
            uploadedFileURL => handleChangeFiles(name, state.data[name].filter(f => f !== uploadedFileURL))
        );
    }

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
            <ImageUploadField
                images={state.data.images}
                name="images"
                labelText="Image Upload"
                deleteHandler={filesDeleteHandler}
                uploadHandler={filesUploadHandler}
                error={state.errors.images}
            />
            {/*<UppyImageForm />*/}
            <Checkbox
                inputProps={{checked: state.data.submit_error, onChange: handleChangeCheckbox}}
                name="submit_error"
                label="Post with error"
                smallText="Check it for form submit error"
                error={state.errors.submit_error}
            />
            <Checkbox
                inputProps={{checked: state.data.image_error, onChange: handleChangeCheckbox}}
                name="image_error"
                label="Image Error"
                smallText="Check it for image upload error"
                error={state.errors.image_error}
            />
        </Fragment>
    )
}

export default ImageForm;