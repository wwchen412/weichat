import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import { signin, signInWithGoogle } from '../helpers/auth';

const Login = ()=> {
    const [errorState, setErrorState] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorState('')
        try {
          await signin(email, password);
        } catch (error) {
            setErrorState( error.message);
        }
      }
    const googleLogin = async (evt) => {
        evt.preventDefault();
        try {
            await signInWithGoogle();
          } catch (error) {
            setErrorState( error.message);
          }
    }
    return(
        <div style={{'height':'100vh'}} className="bg-primary d-flex align-items-center h-full justify-content-center">
            <form   style={{'maxWidth':'495px','background':'#fff'}} 
                    className="rounded p-3 w-100"
                    autoComplete="off"
                    onSubmit={(evt)=> handleSubmit(evt)}> 
                <h1 className="login_title text-center">登入
                    <Link to="/">WeiChat</Link>
                </h1>
                <p className="text-center">請輸入帳號密碼來登入</p>
                <div className="form-group">
                <label htmlFor="signUpEmail">信箱</label>
                <input id="signUpEmail" className="form-control" placeholder="example@gmail.com" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="signUpPassword">密碼</label>
                    <input id="signUpPassword" className="form-control" placeholder="至少八位數" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    {errorState ? <p>{errorState}</p> : null}
                    <button type="submit" className="btn-primary btn">登入</button>
                    <button type="button" className="btn btn-google ml-1" onClick={e => googleLogin(e)}>Google 登入</button>
                    <hr></hr>
                    <p>沒有帳號密碼嗎？<Link to="/signup">註冊</Link></p>
                </div>
            </form>
        </div>
)}
export default Login;