import React, {useState, useEffect, useRef} from "react";
import PortalComponent from "./PortalComponent";
import {handleClickOutside} from "./utils";

export function remove_modal_class_from_body() {
    document.body.classList.remove('modal-open');
}

export function add_modal_class_to_body() {
    document.body.classList.add('modal-open');
}

export default function ModalComponent({children, close}) {

    const wrapperRef = useRef(null);

    handleClickOutside(wrapperRef, closeModal);

    function bodyAddModal() {
        add_modal_class_to_body();
    }

    function closeModal(e) {
        e.preventDefault();
        remove_modal_class_from_body()
        close();
    }

    useEffect(bodyAddModal, []);

    return (
        <PortalComponent id="modal-portal" ref={wrapperRef}>
            <div className="modal-backdrop"/>
            <div className="modal" onClick={closeModal}>
                <div className="card full-page-md" onClick={e => e.stopPropagation()}>
                    <div className="toolbar">
                        <a className="icon-close" onClick={closeModal}/>
                    </div>
                    {children}
                </div>
            </div>
        </PortalComponent>
    );
}