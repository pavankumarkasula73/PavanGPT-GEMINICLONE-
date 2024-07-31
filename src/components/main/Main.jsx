import React, { useContext, useEffect, useState} from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'


const Main = () => {

  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context)

  const [msg,setMsg]=useState("")

  useEffect(()=>{
    if (msg!==""){
        setInput(msg)
    }
  },[msg])

  return (
    <div className= 'main'>
        <div className="nav">
            <p>PavanGPT</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="container">
            {!showResult
            ? <>
                <div className="greet">
                    <p><span>Hello, Dev.</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="cards">
                    <div className="card" onClick={()=>setMsg("Suggest beautiful places to see on an upcoming road trip")}>
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card" onClick={()=>setMsg("Briefly summarize this concept: urban planning")}>
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card" onClick={()=>setMsg("Brainstorm team bonding activities for our work retreat")}>
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card" onClick={()=>setMsg("Tell me about React js and React native")}>
                        <p>Tell me about React js and React native</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
            </>
            : <div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                </div>
              </div>
            
            }

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="" /> : ''} 
                    </div>
                </div>
                <p className="bottom-info">
                PavanGPT may display inaccurate info, including about people, so double-check its responses. 
                </p>
            </div>

        </div>
    </div>
  )
}

export default Main