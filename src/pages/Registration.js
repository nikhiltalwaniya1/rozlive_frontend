import React, { useState } from "react";

//routing
import { Link } from "react-router-dom";

//redux
import { connect } from "react-redux";

import { signupAdmin } from "../store/admin/action";

const Registration = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (
      !email ||
      !password ||
      !code ||
      !newPassword ||
      newPassword !== password
    ) {
      let error = {};
      if (!email) error.email = "Email Is Required !";
      if (!password) error.password = "password is required !";
      if (!newPassword) error.newPassword = "new password is required !";
      if (newPassword !== password)
        error.newPassword = "New Password and Confirm Password doesn't match !";
      if (!code) error.code = "purchase code is required !";
      return setError({ ...error });
    } else {
      let login = {
        email,
        newPassword,
        password,
        code,
      };

      props.signupAdmin(login);
    }
  };
  return (
    <>
      <div className="login-page back__style">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-md-12 col-lg-4">
              <div class="card login-box-container">
                <div class="card-body">
                  <div class="authent-logo mb-4">
                    <span class="text-danger h1">Roz live</span>
                  </div>
                  <div class="authent-text">
                    {/* <p>Welcome to Roz live</p> */}
                    <p>
                      Enter your email address and password to access admin
                      panel.
                    </p>
                  </div>

                  <form autoComplete="off">
                    <div class="mb-3">
                      <div class="form-floating">
                        <input
                          type="email"
                          class="form-control"
                          id="floatingInput"
                          placeholder="name@example.com"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                email: "Email is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                email: "",
                              });
                            }
                          }}
                        />
                        <label for="floatingInput">Email address</label>
                      </div>
                      <div class="mt-2 ml-2 mb-3">
                        {error.email && (
                          <div class="pl-1 text-left pb-1">
                            <span className="text-red font-size-lg">
                              {error.email}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="form-floating">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                password: "Password is Required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                password: "",
                              });
                            }
                          }}
                        />
                        <label for="floatingPassword">New Password</label>
                      </div>
                      <div class="mt-2 ml-2 mb-3">
                        {error.password && (
                          <div class="pl-1 text-left pb-1">
                            <span className="text-red">{error.password}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="form-floating">
                        <input
                          type="password"
                          class="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                newPassword: "newPassword is required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                newPassword: "",
                              });
                            }
                          }}
                        />
                        <label for="floatingPassword">Confirm Password</label>
                      </div>
                      <div class="mt-2 ml-2 mb-3">
                        {error.newPassword && (
                          <div class="pl-1 text-left pb-1">
                            <span className="text-red">
                              {error.newPassword}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="mb-3">
                      <div class="form-floating">
                        <input
                          type="text"
                          class="form-control"
                          id="floatingCode"
                          placeholder="Purchase Code"
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                            if (!e.target.value) {
                              return setError({
                                ...error,
                                code: "Purchase code is required !",
                              });
                            } else {
                              return setError({
                                ...error,
                                code: "",
                              });
                            }
                          }}
                        />
                        <label for="floatingPassword">Purchase Code</label>
                      </div>
                      <div class="mt-2 ml-2 mb-3">
                        {error.code && (
                          <div class="pl-1 text-left pb-1">
                            <span className="text-red">{error.code}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div class="d-grid">
                      <button
                        type="button"
                        class="btn btn-danger m-b-xs"
                        onClick={handleSubmit}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div class="authent-reg">
                    <p>
                      <Link to="/forgot" class="text-info">
                        Forgot password?
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { signupAdmin })(Registration);
