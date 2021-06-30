import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  componentDidMount(){
    document.body.style.backgroundColor = "#f9f9f9"
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12" style={{ width: '30%', marginTop: '50px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="card card-container">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAY0AAAB/CAMAAAAkVG5FAAAAtFBMVEX///8AAADmACicAADR0dH39/ehAADp6en/+vv27e7FxcX09PTa2tpOTk7AwMDkAAB8fHyvr6/Yra5XV1foxciuODzw3d5xcXHFgIHt0tSdnZ1AQECvMDbAZWosLCzmABq1UVSLi4sXFxe3SU7gt7kjIyPGeHy0QkelpaXmACKVlZXqQFOtJS29XmJnZ2epFh/QkZTUn6GnAhI1NTV6ABVtAAD2tb3wjJToJj/Qubu1jpGMQEeZQnOxAAAQWUlEQVR4nO2dCZuquBKG9aIIbuO+2yPu43X3zl3///+6SaoSKhAQu23neE6+55nTAklI6k0qC4HJ5aysrBL02xP173s3K2wbxzFTrd/YlispAavb/keea3XcFdLTZEFvImj+1h/dCfvD67e/PU1//D31TvVjXteqUTYGrIxWesCglJRmZRcJmu9TIH1xaicPx/kUNViAQloAruLdQMWHrB/Vq2iUP8w2qMZC7gzB+saGVGyYkhyHjOH6SB7W0swY5H4dGkFi9mt6xS/MzcGa8TTLSUm2ZZKWxoMw8nmt2m8TgzWiaZrakFTT0kimERZgPm4z1Yjb2tGAQXh+3N81dw1iwL6eJvFS89qx0TjWSBdSfpzGr9NvoBluTeWVKtUmduq0aTRlmW5NebpYblN7KY0Uip3qekrNth7SSGNUNoqnUqmTE5CZeYEG4qkAjXGhbFL98yS4XkGjBDbqR88XGuAgpKrSwnqZqh/x06qCjrSguRIHMJdHRhpZR8GQ63nsPNy6nTGVx/QKGtjdmi41aR+OVv+IDaDk2Dh0A+iV5vEhWXUc2ttIwzysjutnpVFPpkGFfmpluIQeSDUk2dkbB75hE7I0DMK2sUu4LIX13TjVm+tA8TDeMnRZGgZVsCa3U112wdgRoBBoUzuKDXqjsjRMUsOi/HFUSFrmaKT6sxu1QSPFT8WTtDR0qcESaNzYFuLj8ltqfR9RVuOMBrFjKqOa+ZhWjbpet+F00oAdgYqGVYTf27uFyzj7MyeUTiOueMjH9aJ1qrqxAG1i+xIxt0HY9xTI7/su56U0TGPBR/WqNVzzemv+Q5kUaSStLBQJDWwn90ZUlkaKis22qRCyo7A0cq+kwVQsbNu3aCn6tPBv7KneqN8gqlSbQZs+e8JJRLqJn9eLB82ozI0sncYtlorhCczDej0NUKXekM+VsMDQaIKE8LgWAgd2hPtkGlxy3Av2aaS2dw2Anf19Aw3pfsDl6IsfERW0i3Zl5Dto4JIJeif0XMZR1Yd+za4afoVGUg+n0cCuwVRO2IoTdirymbiRXNgxWBomFRIcUFV3TvMkHHLmGHYUGNTwtIkFHunxLA1dogkEMcvJxUR5QY7kV3rIktyVRoiq3TvRBfgRTdDSMEhafRWQ7Z7Fsny+WlPn1NaDdmiyal+e1J6rB/JsPtylUJHbGW94wkijWTUrOu9MpzFOSOX+AkGaXkFD2VMUo99vNPptsomNFIAsZrUbo+02ILtF28mJjkWS5MSOJpdtB09sE8Wjc3FU4i7VLHoBjWJ0r6wurUdJ3rIW23FiXoYEHWkQS0NX07wJVyjyQCNpO6dhGcS8Ss8tKNO0NMwqG9dvyZZZJePS+9FYxoqxecxDcJZGkkrxBfVVfJglQkZfAzBsZJdBg6gXpA+wHnpjQHq3MG04HbvnT0GDqVht7o618cfHx7jWDhKWToWqo/ZN9PO39v23aY5jEXQ1Po4ij9srJS41jiulKrbqBafjpUhP5o4N0vXXroykqVipVLLuMS5mD/pDS6Pxx++P6o/vo/EritL4/Z857zHl/vW7pfFEURq//fPh6JbGU/XnP0L9+Z+Ho/+XxP/zf9+Qv19L2ujs8XdBAhp9/A35+7Wk0dgVHlS1b2k8U+lTmcdkaXxVfwGNYpU1qq/Nkn5WvZhGIVCLRfP4NDvVKyK/Kj0wRZdH1VQXm3rHtKoCIUxzTbhh4kaWSmrpIMwraZSCaIy5vlKV8OY+CBcD8YmHaVkFrkhz9JOTUlktJl2vbRPm9rjkb9qucme7VuLHBoRoCZ6jOzQCY6QjsWvKwrt6DoJGnhvqIKwgSjOmPf+QzxsTaeSTtjLKq4bbw6roe9BI+mQF3V74AA3TzZ5LI7aoy6W+9WB4ifGNaBjep1FSu7sfoWHYJ/BkGiYc4cV3pkG+H3I7Bs1m0CBPxtXjoFQa2wiNuO9+gMYtC434tiNSjHjjeBsaKierUTheKW3HkWhAo1oxqhilEfPsJhrNojk1jUZJv1atywdj0XJQb/s5Gu1cWn5eQkO+ohzb/VTgPEI+QCN9szMdKkVWcow0UhNDGvHxE+4liuy9AndbOxrLkpVGml5CQ+7DMeS0SUsFNNInhoKGrKP6OPeJNPQ9qVJw2zruDzNH+eFpRPcUaop/aCQLDTko0NrRM2nAhpSadg5u+qE+5hOJ8iY00Lncf/knM428dCXay3bPpAF7FG7auZVMETcqRKK8Bw0s8s18lSo7jYocMtHa+800oGkI/jD8iIwi3oMGDqgyPDzJ3otX1O4osg3qmz3VPERg/MbTe9DYmbJuFI5wY7tiqLWARkmFJgN/E41t6k6dZBrxtxCBz5zmVEedjUYlbc/PC2jAiCrLFvuk2V98xxovghw3K5tkm/3RSSPSiGWkghMOalrIHHbdxGspfXL2R3czZrFyViXQqMWMkKTHaKixmjRANhq0viONsra4XW7KOQ21Nu761d910xrHJ2nQvum+jbMrlYb51eMimYg+TEMVsESjf4JGkqhloeNWbtHQON6fBphMWvtRGnLdaFUhN3oeDTqhQFuGnU48Z+9BA3IZe/9CKBDX5AJEdhqyzA1652w0DP2GWdoAFpoGIQkV4SNWzodp0PaVlp1HlUCjH8t3qEBc02mUoy9vaU83ITU1rcfu9hj+1mnsUt8oS6FR01YOcL5XIEMhOEMqSiYatdR3055BQSqBBq5iGCd1gbik08gy3wiLgK8BBOrSJ+YbUc3H0XcZEl/9IH7mPeYbOPQxfvIzEJd0Glnm4qGxKriCuP0CjbAVYkmiFSLlnY1wmfc9aMhPq5qe+wdaiT5DQ41zy2j/T9AIT2A7jq7iJLyZpRf6TWjgZNyUkQANCfoUDVVxcUvK11ZGcKqhP4SNfCVTl2ocb0JDTpoNE8BAK9DnaMgKPf9026CtFhuytlye0jRIqd+EhnorPz7KDcT5L9LAVFBfpIFjJWpVbBr12FhPD/kuNNT7j/PIQm79ZqDx2JhKiP4vob66hitffA4rxTGpdPqFtilnoX4cGurBeH6+w12TxUJT2VCn0aybBeU00qCvu+o0GmVzYlCFjWu4AZxUE6SqnkkivILNAWiMTDcsKBrjhPzUX0gj0g+uxvpWt3srI6BdCg3yvYZMO3gwr+YVdUQre3KoNMaHZQCgRg+MquXu7eDJv5JGrpT2eQtp28/TUO4+K412Cg3Zkkc0ZePDsgLNfwqN9g9GI2WXcjgt/AKNcIL2dRoqrUKYTsL3FqEZ1d6PRq5gWl5YjUin/RUaqvd9Ag01CKyoppEwGkATV9+PBus9Grq/+mjo48Ev0ZCTzGfQyIUfukr/FCn9FukTaNxqz5NpU3cMSLPR5mHb/VE9/sWXVNEwxrT1S+mJ3UsNLlRS7xcGrNy7YdbSWVlZWVlZWVlZWVlZWVlZWVlZWSXK9/3Xp+PR0F48KjvjfTIfhtTCK59N9As6T87wozfpgva93BB/L848r95mJkL4g5PjuIuhzO9k0oNf08kSfrRO8iKmcBAXevu1jCJSak1cxzmtRWlnG/ZnPWlBgOWpw7KEGemKs/6aBXa7cAftANTp8lNrkVFZhO7ey3n4c7NmuRzsZcb8yYH9N8XUrizqTFyaqqj8sHdw1ZUXynNdF+pAz9nPhDaMhjM5cJ0c1+dhJjzA0HWmreXZdS4QteW6aOSNTOPiyPx3nAlPynUOIukp3s3hKZ2d/bl1WTgnHml/Zf9OXReqaMthNNbuBnKyYFb3Ts7h0hrAXfHg6pxVAVrOddC6HDCj1xnG9PjBlJdh4rgdlp21Cn/J+e5G5NF11qJAS1EGjLphReixorVajHznG0yeoqVzcaBe9lSGmeGdAfwY8JPelduQcROm9k8ONInJYo0QFq4L5qY0BDNvxgsU0uBcfUfYgkHhNt2fgMZCnAMaeAMMJbLnnbi5tQOQK5iyiDyjbjeMqA6W/KYnF08vWJ59cTffdcV9eq7jcxrEMR2gqD33msWGz9PGzbl78ctIgxVW0hggNWboKYS/dPDUwj2I+hWnwVI6R2nIS9BQkMYBkkIaxEMsHPh74XeY0QPMNTaT61U1YnIvKCOz9hljiFICjams+YLkxiUdCJqEBSH14vvVY2Y/Q+HNNJy9pOHK2uV1RC0asJxi9Vs4HviqOA3xV6fRcxYkB0DD8cFXxWmsnWXCAaTo7MlBEg3WHJyZ+C0KCzR4RYOQ/HYaja776h5D6MxM2pN13UBjzX8IGj0sjhL3vQOwG6u/LZFIjMZwwinpNHIH53ruyLIjDRaB+6+4p2J+ZHEZmg5kDt21TCzBU4mUZ46oQ3sOT9AYkvLmIp6q47iH5UubhZCo9VAtWM/lCPV4TjcDpqnr8BIJGmFzAS25a0GC3JsseLUlNDA1SFqnkTvza5MLmAdoeOy/lurFMSeiNfa6/NcUvEpvww8OtHO98MAnGPzJiNx9ee6Jl2G9hzwsRfUYin8FDdl6URsZFTr4E7/P+rUtBBw/ZLTndAci+z4fPnHxWsdDGWksXPiXl5TT8Lmvom1jwdPqOrynjNJgl88TVloeWNHwuK9CGusBCAL7fHQjBmfqYEazMjxzU3YEgDNEXMJokZdhht2duPVa5BdpnGkiG3lTZNS78EGuFuS7dXAP6/V6Kjot3VPxbAzdk2it6KmmNKbP5gtMXZdnXvS03FeZ+o2TiQZP4Sx6IkWDAzR4KpmjLqnKw41er1nCF87S4Kn8iYsNifdzniuYoqfSqpfmqWQhTq8c4vrudX86nfYnt2PsN4bQyCO9eG7Q4v6BxzzthXlh3MMGs3Ea7OyQoZMVm3fgZ3kf0VuHNLivWkZ78d4U+21uXHIgqV4OaEQ+aDL14r6LqfHR1xKsK2h4jkK3Xuq9eOcwlHbQ+pbvlRwoDrm1TL34QLgEoDGVNuo5ZPx+4GeBhs/8RJyGiCatJEp3kFX/HKHBfMs5SsNXAzBGQ85UwgRz53CYaqbBCMCMJDc55WYwjIIx1cLtyVwtIjSkKXqvpDGRrXPPsmIcU504L6AxdLCoM3ZOBRCTD5wTtBzXjdLwRZOa4XkxQu04XVFw/6p7KjGUcaOeaoYJXfjf8EA69J6D3nQiPJVphHvAvDIviNGARkeC7nL6mqe6ukvM7+s81VB1BXxabKTRca4e0uALGkvfGy54LNVQcnxaLGdoM0pj2mLCFQ3m8i49f7gGoAM2RLpcprDuQGnwObnoxc8t0JIzcybn1nkjmoV/woOwf7iwIdblwnr2FgewX2LMXkjDx1yxq1j/gQazdbfj+52uKPjGvWDUjlgE2rD77PW+8nulJqPMBbhaNx36yyk76+E8SYwlHfcM4VEc5ARpKB/NacAYFZcDl1dxOAOjLzfhmtyV18kD0vDEmtHakeL3FWuVbAgLAegB3mnBE1vwongqImPjOXJ2d8Ffa9kYfGzmZ1Ug5idUVG6G3vQaZv41IovJ/Ke2bF0xXfE6rLr6+nWPXVQxw1VovlTt0+XqjqiwJJZHMqHCefx0xVeSYcg8Ob4G7tGAKI+WB2/mqdzFCkSjViKJWllZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZ/cT6PypKlLUbT+82AAAAAElFTkSuQmCC" width="50%" height="50%" style={{ marginTop: '50px', marginLeft: 'auto', marginRight: 'auto' }} />
         
         <br/> <p style={{ width: '60%', marginLeft: '90px', marginRight: 'auto' , fontWeight: "bold", fontSize: "120%", fontFamily:"'Times New Roman', Times, serif"}}>
          Ajouter un collaborateur
        </p>
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}>
            {!this.state.successful && (
              <div>
                <div className="form-group" as={Col} style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                  <label htmlFor="username"></label>
                  <Input autocomplete="off"
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group" as={Col} style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                  <label htmlFor="password"></label>
                  <Input autocomplete="off"
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <br />

                <div className="form-group" style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                  <button className="btn btn-danger btn-block">Add</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group" style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', fontFamily: "Helvetica" }}>
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}

<br />
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
