import React, { useState } from "react";

export default function Register(props) {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(key, value) {
    setRegister({
      ...register,
      [key]: value,
    });
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    props.childSendActionToParent('Batata Harrra')
  };

  return (
    <>
      <form onSubmit={(event) => handleRegisterSubmit(event)}>
        <h2>Register here</h2>
        <span>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={(event) => handleChange("name", event.target.value)}
          />
        </span>
        <br />
        <span>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={(event) => handleChange("email", event.target.value)}
          />
        </span>
        <br />
        <span>
          <label>Password</label>
          <input
            type="text"
            name="password"
            onChange={(event) => handleChange("password", event.target.value)}
          />
        </span>{" "}
        <br />
        <input type="submit" />
      </form>
    </>
  );
}
