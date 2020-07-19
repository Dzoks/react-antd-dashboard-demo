import React from 'react';
import { withModal } from "react-antd-dashboard";
import { Modal, } from 'antd';
const KeyModal = props => {
    const { modalData, modalProps, closeDialog, showDialog} = props;
    // modalProps are props created with HOC. You need to pass them to your root Modal component.
    // modalData is object passed with showDialog(object) function call
    // showDialog(object?) and closeDialog() are function created with HOC intended to use with ref on component, but are also available inside component
    return <Modal {...modalProps} title="Key information" onOk={closeDialog} >
        <div>Key property for user {modalData?.name} is: {modalData?.key}</div>
    </Modal>
};

export default withModal()(KeyModal); // You can pass default modalData object as first HOC parameter