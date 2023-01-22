import ReactDOM from "react-dom";
import React, {Fragment, useState} from "react";
import ModalComponent from "../reusables/ModalComponent";
import CreateApp from "../forms/CreateAppComponent";

function ModalApp() {
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const toggle_modal1 = () => setShowModal1(!showModal1);
    const toggle_modal2 = () => setShowModal2(!showModal2);
    const modal = () =>
        <ModalComponent close={toggle_modal1}>
            <h1>Modal title</h1>
            <p>some description</p>
        </ModalComponent>

    const modal_form = () =>
        <ModalComponent close={toggle_modal2}>
            <h2>Modal with Form</h2>
            <p>This is a reusable form.</p>
            <div className="form-container">
                <CreateApp/>
            </div>
        </ModalComponent>


    return (
        <Fragment>
            <section className="full-page-sm">
                <h2 className="header">Simple modal</h2>
                <div className="card">
                    <button className="btn block" onClick={toggle_modal1}>Click me to open modal</button>
                </div>
                {showModal1 ? modal() : ""}
            </section>

            <section className="full-page-sm">
                <h2 className="header">Modal with form</h2>
                <div className="card">
                    <button className="btn block" onClick={toggle_modal2}>Click me to open modal</button>
                </div>
                {showModal2 ? modal_form() : ""}
            </section>
        </Fragment>
    )
}

ReactDOM.render(<ModalApp/>, document.getElementById('modal-app'));


