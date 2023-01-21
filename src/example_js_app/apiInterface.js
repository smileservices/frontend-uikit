export function dummyPost(URL, data, dispatchForm, dispatchData) {
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
        () => callback(uploadedFileNames),
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
        () => callback(),
        4000
    );
}