import React, { useContext, useState } from 'react'
import "./LoginPop.css"
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPop = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext)

    const [currState, setCurrState] = useState("Sign Up")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onchangeHandler = (e) => {
        const { name, value } = e.target

        setData(formdata => ({ ...formdata, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        let newUrl = url

        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data)

        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
        } else {
            alert(response.data.message)
        }
    }



    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={onLogin}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input type="text" name='name' onChange={onchangeHandler} value={data.name} placeholder='Your name' required />}

                    <input type="email" name='email' onChange={onchangeHandler} value={data.email} placeholder='Your email' required />
                    <input type="password" name='password' onChange={onchangeHandler} value={data.password} placeholder='Password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By Continuing , i agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login"
                    ?
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span> </p>
                    :
                    <p>Already have a account? <span onClick={() => setCurrState("Login")}>Login here</span> </p>
                }
            </form>
        </div>
    )
}

export default LoginPop