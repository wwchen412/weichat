import React, { useState, useEffect, useLayoutEffect,useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { auth, db } from '../services/firebase'

const Chat = ()=>{
    const ref = useRef(null);
    let typeInput;
    const [state, setState] = useState({
        user: auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null
    })
    useEffect(()=>{
        
        (async function chatFunction() {
            setState((prestate)=>{
                return{...prestate,readError: null}
            })      
            try{
                db.ref("chats").on("value",snapshot => {
                    let chats = [];
                    snapshot.forEach((snap) => {
                        chats.push(snap.val())
                    });
                    setState((prestate)=>{
                            return{...prestate,chats:chats}
                        })
                    
                })
            }catch(error){
                setState((prestate)=>{
                    return{...prestate,readError: error.message}
                })
            }
        })();
        
    },[])
    useEffect(()=>{
        typeInput.focus();
    })
    useLayoutEffect(()=>{
        ref.current.scrollTop = ref.current.scrollHeight;
    })
    const handleChange = (event)=> {
        setState({...state,content: event.target.value});
    }
    
    const handleSubmit = async (event) => {

        event.preventDefault();
        if(state.content.trim() === ''){
            return 
        }
        setState({ ...state,writeError: null });
        try {
            await db.ref("chats").push({
                content: state.content,
                timestamp: Date.now(),
                uid: state.user.uid,
                email: state.user.email
        });
            setState((prestate)=>{
            return{...prestate,content: ''}
        })
        } catch (error) {
            setState({ ...state,writeError: error.message });
        }
    }
    const  formatTime = (timestamp)=> {
        const d = new Date(timestamp);
        // const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
         const time = `${d.getHours()}:${d.getMinutes()}`;
        return time;
    }

    
    return(
        <div>
            <Header></Header>
            <section className="chatArea p-3">
                <div className="chats">
                    <div className="chats_content" ref={ref}>
                        {state.chats.map(chat => {
                            return <div key={chat.timestamp} className={( state.user.uid === chat.uid ? 'current_user': "")}>
                                        <span className="chats_userName">{chat.email ?chat.email:'陌生人'}</span>
                                        <div className="chats_bubble">
                                            {chat.content}
                                            <span className="chats_time">{formatTime(chat.timestamp)}</span>
                                        </div>
                                    </div>
                        })}
                    </div>
                <form   className="chats_input"
                        onSubmit={e=>handleSubmit(e)}>
                    <div className="input-group">
                        <input  ref={(input)=> typeInput = input}
                                onChange={e=>handleChange(e)} 
                                value={state.content}></input>
                        {state.error ? <p>{state.writeError}</p> : null}
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-primary">Send</button>
                        </div>
                    </div>
                </form>
                </div>
                <div>
                Login in as: <strong>{state.user.email}</strong>
                </div>
            </section>
            <Footer></Footer>
        </div>
    )
}
export default Chat;