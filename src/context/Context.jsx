import React,{ createContext, useState } from "react";
import runChat from "../config/Config";

export const Context=createContext()

const ContextProvider=(props)=>{

    const [input,setInput]=useState("")
    const [recentPrompt,setRecentPrompt]=useState("")
    const [prevPrompts,setPrevPrompts]=useState([])
    const [showResult,setShowResult]=useState(false)
    const [loading,setLoading]=useState(false)
    const [resultData,setResultData]=useState("")

    const delay=(index,next)=>{
        setTimeout(() => {
            setResultData(prev=>prev+next)
        }, 75*index);
    }

    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent=async(prompt)=>{

        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;

        if (prompt!==undefined){
            response=await runChat(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response=await runChat(input)
        }
        let resArray=response.split("**")
        let newArray=''
        for(let i=0;i<resArray.length;i++){
            if (i===0 || i%2===0){
                newArray+=resArray[i]
            }
            else{
                newArray+="<b>"+resArray[i]+"</b>"
            }
        }

        let newRes=newArray.split("*").join("</br>")
        let newResponse=newRes.split(" ")
        for(let i=0;i<newResponse.length;i++){
            const nextword=newResponse[i];
            delay(i,nextword+" ")
        }
        setLoading(false)
        setInput("")
    }

    const contextValue={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider