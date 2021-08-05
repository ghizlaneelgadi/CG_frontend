import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import AuthService from "../services/auth.service";
import Modal from "./Modal";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";



const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
}; 
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "", email: "" },
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

  handleUpdate() {
  }

  matchingPass(){
   
      console.log("Passwords don't match.")
      
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
                Reset password
              </Button>
              <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: "light", fontSize: "180%", fontFamily: "'Times New Roman', Times, serif" }}>Change your password</h2>
                <hr />
                <Form>
                <div className="form-group">
                  <label>Old password</label>
                  <Input
                    type="password"
                    value={this.state.modalInputOld}
                    name="modalInputOld"
                    onChange={e => this.handleChange(e)}
                    className="form-control"
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label>New password</label>
                  <Input
                    type="password"
                    value={this.state.modalInputNew}
                    name="modalInputNew"
                    className="form-control"
                    onChange={e => this.handleChange(e)}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm new password</label>
                  <Input
                    type="password"
                    value={this.state.modalInputConfirm}
                    name="modalInputConfirm"
                    className="form-control"
                    onChange={e => this.handleChange(e)}
                    validations={[required, vpassword]}
                  />
                </div>
                <hr />
                
                <Button size="mm" variant="danger" type="submit"
                  style={{ float: 'right', width: "100%" }} 
                  onClick={this.state.modalInputConfirm === this.state.modalInputNew ? this.handleUpdate : this.matchingPass}>
                  Update password
                </Button>
                </Form>
              </Modal>
            </header>
          </div> : null}
      </div>
    );
  }
}
