import React, { useState } from "react";

const Form = ({ route, onRouteChange, loadUser }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value)
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onSubmitRegister = (event) => {
    event.preventDefault();
    fetch('https://brain-api.onrender.com/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          onRouteChange('home');
        }
      })
      .catch("error fetch /register :", console.log)
  }

  const onSubmitSignIn = (event) => {
    event.preventDefault();
    fetch('https://brain-api.onrender.com/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          loadUser(data);
          onRouteChange('home');
        }
      })
  }


  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            {route === 'register'
              ?
              <div>
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    name="name"
                    id="name"
                    onChange={onNameChange}
                  />
                </div>
              </div>
              :
              route === 'signin' || route === 'signout'
                ? <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                : <div></div>
            }

            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          {route === 'register'
            ?
            <div className="">
              <input
                onClick={onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register" />
            </div>
            :
            route === 'signin' || route === 'signout'
              ?
              <div>
                <div className="">
                  <input
                    onClick={onSubmitSignIn}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                  <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                </div>
              </div>
              :
              <div></div>
          }

          <div className="lh-copy mt3">
          </div>
        </form>
      </main>
    </article>

  )
}

export default Form;