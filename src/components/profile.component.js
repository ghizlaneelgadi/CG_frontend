import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import AuthService from "../services/auth.service";
import Modal from "./Modal";


export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      open: false,
      modal: false,
      name: "",
      modalInputName: ""
    };


  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    this.setState({ name: this.state.modalInputName });
    this.modalClose();
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

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron" style={{ marginTop: '50px', width: "80%", marginLeft: 'auto', marginRight: 'auto', marginTop: '40px' }}>
              <h3 style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                {currentUser.username}'s profile
              </h3>
              <br />
              <div>
                <p>
                  <strong>username:</strong>{" "}
                  {currentUser.username}
                </p>
                <strong>Authorities:</strong>
                <ul>
                  {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
              </div>
              <br />
              <Button size="mm" variant="danger" type="submit"
                style={{ float: 'right', width: "100%" }} href="javascript:;" onClick={e => this.modalOpen(e)} >
                Change information
              </Button>
              <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                <h2>Change password</h2>
                <hr />
                <div className="form-group">
                  <label>Old password</label>
                  <input
                    type="password"
                    required
                    value={this.state.modalInputOld}
                    name="modalInputOld"
                    onChange={e => this.handleChange(e)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>New password</label>
                  <input
                    type="password"
                    required
                    value={this.state.modalInputNew}
                    name="modalInputNew"
                    onChange={e => this.handleChange(e)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm new password</label>
                  <input
                    type="password"
                    required
                    value={this.state.modalInputConfirm}
                    name="modalInputConfirm"
                    onChange={e => this.handleChange(e)}
                    className="form-control"
                  />
                </div>
                <hr />
                
                <Button size="mm" variant="danger" type="submit"
                  style={{ float: 'right', width: "100%" }}
                  onClick={e => this.handleSubmit(e)} >
                  Update password
                </Button>
              </Modal>


            </header>
          </div> : null}
      </div>
    );
  }
}