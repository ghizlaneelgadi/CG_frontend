import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Card, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faFastBackward, faStepForward, faFastForward, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import UserService from "../services/user.service";
import Modal from "./Modal";
import authHeader from '../services/auth-header';
import axios from "axios";
import MyToast from "./MyToast";

export default class UsersList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            users: [],
            currentPage: 1,
            open: false,
            modal: false,
            name: "",
            modalInputName: "",
            currentUser: { username: "", email: "" },
            usersPerPage: 5
        };
    }

    componentDidMount() {
        UserService.getUsersList().then(
            response => {
                this.setState({
                    users: response.data
                });

            });
        document.body.style.backgroundColor = "#f9f9f9";
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
    }

    changePage = event => {
        this.setState({

            [event.target.name]: parseInt(event.target.value)

        });
    };

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.users.length / this.state.usersPerPage)
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    deleteUser = (id) => {
        if(window.confirm('Are you sure?')){
            axios.delete("http://localhost:8080/api/userslist/delete/" + id, { headers: authHeader() })
            .then(response => {
                if(response.data != null){
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({"show":true});
                    this.setState({
                        users: this.state.users.filter(user => user.id !== id)
                    });
                } else{
                    this.setState({"show": false});
                }
            })
        }
    }

    modalOpen() {
        this.setState({ modal: true });
    }


    modalClose() {
        this.setState({
            modalInputName: "",
            modal: false
        });
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { users, currentPage, usersPerPage } = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentusers = users.slice(firstIndex, lastIndex);
        const totalPages = users.length / usersPerPage;
        

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        }

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const { currentUser } = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast children = {{show:this.state.show, message: "User deleted successfully."}}></MyToast>
                </div>
                <div className="container">
                {(this.state.userReady) ?
                    <Card className="border border-white text-black" style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px' }} >
                        <Card.Header lg={12} className="text-center texte-muted"><h5>List of users</h5></Card.Header>
                        <Card.Body>
                            <Table id="table" hover size="sm" responsive border >
                                <thead>
                                    <tr>
                                        <th>Username </th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 ?
                                        <tr>
                                            <td colSpan="10"> Users</td>
                                        </tr> :
                                        currentusers.map((users) => (currentUser.username !== users.username ? 
                                            <tr key={users.id}>
                                                <td>{users.username}</td>
                                                <td>{users.mail}</td>
                                                <td><Button size="sm" variant="danger" type="submit"
                                                        onClick={this.deleteUser.bind(this, users.id)}>
                                                        < FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                    
                                                    <Modal show={this.state.modal} handleClose={e => this.modalClose(e)} >
                                                        <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: "light", fontSize: "130%", fontFamily: "'Times New Roman', Times, serif" }}>
                                                            Are u sure you want to delete {users.username} ?</p>
                                                        <br />
                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Button size="mm" variant="danger" type="submit"
                                                                >
                                                                Yes
                                                            </Button>
                                                            <Button size="mm" variant="danger" type="submit"
                                                                onClick={e => this.modalClose(e)}
                                                                style={{ marginLeft: '20px' }}>
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </Modal>
                                                </td>
                                            </tr> : null
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <div style={{ "float": "right" }}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                            < FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                            < FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>

                                    <FormControl style={pageNumCss} name="currentPage" value={currentPage}
                                        onChange={this.changePage} />

                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            < FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            < FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </div>
                        </Card.Footer>

                    </Card> : null}

            </div>
            </div>
            

        )
    }
}