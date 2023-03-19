import React from 'react'

const Button = ({activeForm}) => {
  return (
    <div className='button'>
         <button type='submit'> {activeForm == "login" ?  "Log In" : "Sign Up"}</button>
    </div>
  )
}

export default Button
