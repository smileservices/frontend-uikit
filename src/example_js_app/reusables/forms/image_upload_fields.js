import {useState} from "react";
import {useDropzone} from "react-dropzone";
import {makeId} from "../utils";
import Waiting from "../Waiting";

export function FileUploadField(
    {
        uploadedFiles, //[] list of exisitng files
        deleteTrigger, //func to trigger the deletion of existing files
        name, //str name of the formfield (must match the form state field)
        labelText, //str label of the formfield
        uploadTrigger, //func to trigger upload of the selected files
        error //str error text
    }
) {
    const [files, setFiles] = useState([]);
    const [deleteWait, setDeleteWait] = useState(false);
    const [wait, setWait] = useState(false);

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {
            // 'image/*': []
        },
        onDropAccepted: (acceptedFiles, e) => {
            console.log("accepted file", acceptedFiles);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const displayFileThumb = file => {
        let fileUrl = "";
        let fileName = "";
        if (String(file) === file) {
            fileName = file.split("/").pop();
            fileUrl = file;
        } else {
            fileName = file.name;
            fileUrl = file.preview;
        }
        const fileType = fileName.split(".").pop();
        if (["jpg", "jpeg", "png", "svg", "bmp"].includes(fileType)) {
            return (<img src={fileUrl} key={makeId(3)}/>);
        }
        return fileName;
    }


    function uploadAction(e) {
        e.preventDefault();
        setWait(true);
        uploadTrigger(name, files, () => {
            setFiles([]);
            setWait(false);
        });
    }


    function deleteAction(file) {
        setDeleteWait(file);
        deleteTrigger(name, file, () => {
            setDeleteWait(false)
        });
    }

    function existingFile(file) {
        return (
            <div key={makeId(3)} className="file-container">
                {!deleteWait ?
                    <div className="toolbar">
                        <a className="delete" onClick={() => deleteAction(file)}><span
                            className="icon-cancel"></span></a>
                    </div>
                    : ""}
                {displayFileThumb(file)}
                {deleteWait === file ? <div className="overlay-waiting"><Waiting text="Deleting"/></div> : ""}
            </div>
        )
    }

    function loadedFile(file) {
        return (
            <div key={makeId(3)} className="file-container">
                {displayFileThumb(file)}
            </div>
        )
    }


    return (
        <div className="form-group image-upload">
            <label htmlFor={name}>{labelText}</label>

            <div className="dropzone-input">
                <div className="thumbs-container">
                    {uploadedFiles.length === 0 ?
                        "Nothing uploaded" :
                        uploadedFiles.map(i => existingFile(i))
                    }
                </div>

                <div className="upload-area">
                    {wait ? <div className="overlay-waiting"><Waiting text="Uploading"/></div> : ""}

                    <div {...getRootProps({className: 'dropzone'})} id={name}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                        {files.length === 0 ?
                            <p>Nothing selected for upload.</p> :
                            <p>{files.length} files selected for upload. Press Upload button.</p>
                        }
                    </div>

                    <div className="thumbs-container">
                        {files.length > 0 ? files.map(f => loadedFile(f)) : ""}
                    </div>
                    {files.length > 0 ?
                        <div className="buttons-container">
                            <button className="btn secondary" onClick={() => setFiles([])}>Reset</button>
                            <button className="btn secondary" onClick={uploadAction}>Upload</button>
                        </div>
                        : ""}
                </div>
                {error ? (<div className="invalid-feedback">{error}</div>) : ''}
            </div>
        </div>
    );
}