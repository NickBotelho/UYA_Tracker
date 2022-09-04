import React, { createRef, useState, useCallback } from "react";
//import  '../../static/css/searchbar.css';
import "../../static/css/searchbar.css";
import { Redirect } from "react-router";
function Searchbar(props){
    const name = props.name
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    let info = {
        name:""
    }
    let [search, setSearch] = useState(null)
    let [notFound, setNotFound] = useState("")

    function randomName(){
        const names = ["THE PYTHON", 'x_x iM DeAd']
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        var index = getRandomInt(names.length)
        return names[index]
    }
    const holder = randomName()
 
    async function buttonSearch(){

        const requestSearch = {
            method: "POST",
            headers:  {
                'Content-Type': "application/json; charset=utf-8",
                Accept: "application/json",
                "Cache-Control": "no-cache"
            },
            credentials: "include",
            body: JSON.stringify({
                name: info.name,
            }),    
        }
        const search_result = await fetch(`${props.address}/api/players/stats`, requestSearch)
        const data = await search_result.json()
        if (data.status === 404){
            setNotFound("Name not found...")
        }
        else{
            setSearch({
                isSearching: true,
                name: info.name
            })
        }
        
    }
    async function keySearch(e){
        if (e.key === 'Enter'){
            console.log(info)
            const requestSearch = {
                method: "POST",
                headers:  {
                    'Content-Type': "application/json; charset=utf-8",
                    Accept: "application/json",
                    "Cache-Control": "no-cache"
                },
                credentials: "include",
                body: JSON.stringify({
                    name: info.name,
                }),    
            }
            const search_result = await fetch(`${props.address}/api/players/stats`, requestSearch)
            const data = await search_result.json()
            if (data.status === 404){
                console.log("name not found")
                setNotFound("Name not found...")
            }
            else{
                setSearch({
                    isSearching: true,
                    name: info.name
                })
            }
        }
    }
    function update(){
        info.name = document.getElementById("tbar").value
    }

    

    const restingStyle = {
        background:"rgba(190, 177, 54, 0.8)",
        cursor:'pointer',
        fontSize:"14pt",
        border : "3px solid rgb(141,113,24)",
        fontFamily:"Roboto, sans-serif",
        fontWeight:"bolder",
        textShadow:"1px 1px 1px black",
        color: 'rgb(141,113,24)',
        marginLeft:"0",
        userSelect:"none"

    }
    const hoverStyle={
        background:"rgba(217,163,58,0.8)",
    }
    const buttonHover = (e) => {
        let ref = e.currentTarget
        ref.style.background = hoverStyle.background
    }
    const buttonLeave = (e) =>  {
        let ref = e.currentTarget
        ref.style.background = restingStyle.background
    }
    if (search === null){
        if(props.isDesktop){
            return(
                <div>
                    <div className='container'>
                        <div >
                            <input type="text" onChange = {update} id = "tbar" placeholder= {`${holder}...`} onKeyPress={keySearch}
                            style = {{
                                backgroundColor:"rgba(190, 177, 54, 0.8)",
                                border : "3px solid rgb(141,113,24)",
                                cursor:'pointer',
                                fontFamily:"Roboto, sans-serif",
                                fontWeight:"bolder",
                                paddingRight:'60px',
                                paddingLeft:'60px',
                                textAlign:'center',
                                height:'75%',
                                textShadow:"0px 0px 1px black",
                                color: 'rgb(141,113,24)',
                                userSelect:'none'
                                                     
                            }} onMouseEnter = {buttonHover}
                            onMouseLeave = {buttonLeave}></input>  
                        </div>
                        <div >
                            <button className="button" onClick = {buttonSearch} name = "search_button"
                            style = {restingStyle}
                            onMouseEnter = {buttonHover}
                            onMouseLeave = {buttonLeave}>Search</button>
                        </div>
                    </div>
                    <div style = {{
                        textAlign:"center",
                        fontSize:'12pt',
                        color:"black",
                        fontWeight:"bolder",
                    }}>
                        {notFound.toUpperCase()}
                    </div>
                </div>
                
            );
        }
        else{
            return(
                <div>
                    <div className='container'>
                        <div >
                            <input type="text" onChange = {update} id = "tbar" placeholder= {`${holder}...`} onKeyPress={keySearch} 
                            style = {{
                                backgroundColor:"rgba(190, 177, 54, 0.8)",
                                border : "3px solid rgb(141,113,24)",
                                cursor:'pointer',
                                fontFamily:"Roboto, sans-serif",
                                fontWeight:"bolder",
                                paddingRight:'60px',
                                paddingLeft:'60px',
                                textAlign:'center',
                                height:'75%',
                                textShadow:"0px 0px 1px black",
                                color: 'rgb(141,113,24)',
                                width:'100px',
                                userSelect:'none'
                                                     
                            }}></input>  
                        </div>
                        <div >
                            <button className="button" onClick = {buttonSearch} name = "search_button"
                            style = {restingStyle}
                            onMouseEnter = {buttonHover}
                            onMouseLeave = {buttonLeave}>Search</button>
                        </div>
                    </div>
                    <div style = {{
                        textAlign:"center",
                        fontSize:'11pt',
                        color:"black",
                        fontWeight:"bolder",
                    }}>
                        {notFound.toUpperCase()}
                    </div>
                </div>
                
            );
        }
        
    }else{
        const redirect = "/players"+"?name="+encodeURIComponent(search.name)
        return <Redirect push to = {redirect}/>
    }
}

export {Searchbar};
