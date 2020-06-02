import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import { signup ,signInWithGoogle } from '../helpers/auth';

const SignUp =  () => {
    const [errorState, setErrorState] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setErrorState('')
        try {
          await signup(email, password);
        } catch (error) {
            setErrorState( error.message);
        }
      }
    const googleSignIn = async (evt) => {
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
                onSubmit={(evt) => handleSubmit(evt)}>
            <h1 className="text-center">登入
                <Link to='/'>WeiChat</Link>
            </h1>
            <p className="text-center">創建帳號登入聊天</p>
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
                <button type="submit" className="btn-primary btn">註冊</button>
                <button onClick={(e)=>googleSignIn(e) } type="button" className="btn btn-google ml-1">
                Sign up with Google
                </button>
                <hr></hr>
                <p>已經有帳號了嗎？<Link to="/login">登入</Link></p>
            </div>
        </form>
    </div>
)
}

export default SignUp;