import React, {Fragment} from "react"
import {FileUploadField} from "../../components/forms/image_upload_fields";

import {
    Input, Checkbox,
} from "../../components/form";

export const FORM_INITIAL_STATE = {
    data: {
        name: "",
        images: [
            // "https://thumbs.dreamstime.com/t/two-yellow-ducklings-white-background-137011182.jpg",
            // "https://topicimages.mrowl.com/small/priyalove/sonam_kapoor_0.jpg",
            // "https://cdn.cnn.com/cnnnext/dam/assets/171115083138-cali-shooting-small-11.jpg"
        ],
        submit_error: false,
        image_error: false,
    },
    errors: {}
}

export function normalizeImageForm(data) {
    return {...data};
}

export function filesUploadHandler(url, files, callback) {
    // upload the files to the URL and return their names
    console.log("uploading files", url)
    const file = new FileReader(files[0].preview);
    const form = new FormData();
    form.append("image", file);
    console.log(form);
    // fetch(url, {
    //     method: "POST",
    //     body: form
    // });
    const uploadedFileNames = files.map(f => f.preview);
    setTimeout(
        ()=> callback(uploadedFileNames),
        4000
    );

}

export function filesDeleteHandler(url, resourceUrl, callback) {
    //deletes the file from the URL
    console.log("making DELETE post", resourceUrl);
    // fetch(url, {
    //     method: "DELETE",
    //     body: resourceUrl
    // });
    setTimeout(
        ()=> callback(),
        4000
    );
}

export function validateImageForm(data) {
    return false;
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

    function filesUploadTrigger(name, filesArray, callback) {
        filesUploadHandler(
            "http://localhost:1234",
            filesArray,
            uploadedFilesURLS => {
                if (state.data.image_error) {
                    dispatch({type: "FORM_ERROR", payload: {images: "Error while trying to upload"}});
                } else {
                    dispatch({type: "FORM_ERROR", payload: {}});
                    handleChangeFiles(name, state.data.images.concat(uploadedFilesURLS));
                    callback();
                }
            }
        );
    }

    function filesDeleteTrigger(name, fileDeleteURL, fieldCallback) {
        filesDeleteHandler(
            "http://localhost:1234",
            fileDeleteURL,
            () => {
                handleChangeFiles(name, state.data[name].filter(f => f !== fileDeleteURL));
                fieldCallback();
            }
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
            <FileUploadField
                uploadedFiles={state.data.images}
                name="images"
                labelText="Image Upload"
                deleteTrigger={filesDeleteTrigger}
                uploadTrigger={filesUploadTrigger}
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