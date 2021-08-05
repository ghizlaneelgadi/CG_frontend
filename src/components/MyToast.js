import React, {Component} from "react";
import { Toast } from "react-bootstrap";

export default class MyToast extends Component {
    render(){
        const toastCss = {
            position: 'fixed',
            top: '55px',
            right: '10px',
            zIndex: "1",
            width: "300px",
            boxShadow:  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }

        return (
            <div style = {toastCss}>
                <Toast className = {"border text-white border-danger bg-danger "}>
                    <Toast.Header className = {"bg-danger text-white"} closeButton={false}>
                        <strong className = "mr-auto"> Success</strong>

                    </Toast.Header>
                    <Toast.Body>
                        User deleted successfully.

                    </Toast.Body>
                </Toast>
            </div>
        )
    }
}