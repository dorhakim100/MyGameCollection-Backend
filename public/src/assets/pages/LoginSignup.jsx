export function LoginSignup({ onSetUser }) {
  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    onLogin(credentials)
  }

  // function onLogin(credentials) {
  //   isSignup
  //     ? signup(credentials)
  //         .then((data) => {
  //           onSetUser(data.loggedinUser)
  //         })
  //         .then(() => {
  //           showSuccessMsg('Signed in successfully')
  //         })
  //         .catch((err) => {
  //           showErrorMsg('Oops try again')
  //         })
  //     : login(credentials)
  //         .then((data) => {
  //           console.log(data)
  //           onSetUser(data)
  //         })
  //         .then(() => {
  //           showSuccessMsg('Logged in successfully')
  //         })
  //         .catch((err) => {
  //           showErrorMsg('Oops try again')
  //         })
  // }

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          value={credentials.username}
          placeholder='Username'
          onChange={handleChange}
          required
          autoFocus
        />
        <input
          type='password'
          name='password'
          value={credentials.password}
          placeholder='Password'
          onChange={handleChange}
          required
          autoComplete='off'
        />
        {isSignup && (
          <input
            type='text'
            name='fullname'
            value={credentials.fullname}
            placeholder='Full name'
            onChange={handleChange}
            required
          />
        )}
        <button onClick={onSignupLogin}>{isSignup ? 'Signup' : 'Login'}</button>
      </form>

      <div className='btns'>
        <a href='#' onClick={() => setIsSignUp(!isSignup)}>
          {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
    </div>
  )
}