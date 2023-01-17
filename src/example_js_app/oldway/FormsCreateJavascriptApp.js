import React, {useEffect, useState, Fragment} from "react";
import ReactDOM from "react-dom";
import confettiFactory from "../../vanilla/confetti";
import CreateableFormComponent from "../../components/CreateableFormComponent";

const startConfetti = confettiFactory(100, 1);

import ReactForm from "./ReactForm";

function FormsCreateJavascriptApp() {

    const [created, setCreated] = useState(false);

    const defaultData = {
        'name': '',
        'description': '',
        'select': [],
        'checkbox': false,
    }

    useEffect(() => {
        if (created) startConfetti('confetti-canvas');
    }, [created,]);

    if (created) return (
        <div className="success-card column-container card full-page-sm">
            <canvas id="confetti-canvas" key="confetti-canvas"/>
            <header>The resource has been created</header>
            <div className="body">
                <div className="buttons-container">
                    <a className="btn dark" href="/">Back to Homepage</a>
                </div>
            </div>
        </div>
    );

    return (
        <CreateableFormComponent
            endpoint={"#"} //endpoint for creating the resource
            FormViewComponent={ReactForm}
            successCallback={data => setCreated(data)}
            data={defaultData}
            extraData={{formTitle: "Example Create JS Form"}}
        />
    )
}

ReactDOM.render(<FormsCreateJavascriptApp/>, document.getElementById('forms-javascript'));