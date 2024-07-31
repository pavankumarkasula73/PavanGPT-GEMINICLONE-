import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './Sidebar.css'
import { Context } from '../../context/Context'

const Sidebar = () => {

  const [extend,setExtend]=useState(false)

  const {onSent,prevPrompts,setRecentPrompt,newChat}=useContext(Context)

  const load=async(prompt)=>{
        setRecentPrompt(prompt)
        await onSent(prompt)
  }

  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setExtend(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
            <div onClick={()=>newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {extend ? <p>New Chat</p> : null}
            </div>
            {extend ? 
            <div className="recent">
                <p className="recent-title">Recent</p>
                {prevPrompts.map((item,index)=>{
                    return (
                        <div onClick={()=>load(item)} className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p style={{'padding-right':'40px'}}>{item.slice(0,16)} ...</p>
                        </div>
                    )
                })}
            </div>
            : null}
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extend ? <p>Help</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extend ? <p>Activity</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extend ? <p>Settings</p> : null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar