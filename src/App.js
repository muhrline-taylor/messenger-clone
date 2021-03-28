import './static/css/App.css';
import React, {useState, useEffect} from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from "./components/Message";
import db from './firebase';
import { IconButton } from '@material-ui/core'
import SendIcon from "@material-ui/icons/Send"



function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("Please enter your name"))
  },[])

  useEffect(() => {
    db.collection('messages')
    .onSnapshot(snapshot => {
      var newSnapshot = snapshot._.ud.docChanges.sort((a, b) => a.doc.Vt.proto.mapValue.fields.fields.mapValue.fields.timestamp.mapValue.fields.stringValue.integerValue > b.doc.Vt.proto.mapValue.fields.fields.mapValue.fields.timestamp.mapValue.fields.stringValue.integerValue ? -1 : 1)
      setMessages(newSnapshot.map(doc => doc.doc.Vt.proto.mapValue))}
    )
    
  },[])

  

  const sendMessage = e => {
    e.preventDefault();

    
    db.collection("messages").add({
      "fields": {
        "username": {
          "stringValue": username
        },
        "message": {
          "stringValue": input
        },
        "timestamp": {
          "stringValue": Date.now()
        }
      }
    })
    setInput("");
    db.collection('messages')
    .onSnapshot(snapshot => {
      var newSnapshot = snapshot._.ud.docChanges.sort((a, b) => a.doc.Vt.proto.mapValue.fields.fields.mapValue.fields.timestamp.mapValue.fields.stringValue.integerValue > b.doc.Vt.proto.mapValue.fields.fields.mapValue.fields.timestamp.mapValue.fields.stringValue.integerValue ? -1 : 1)
      
      setMessages(newSnapshot.map((item, k) => item.doc.Vt.proto.mapValue))}
    )
  }

  
  

  

  return (
    <div className="App">
      <img style={{maxHeight: "40px", maxWidth: "40px"}} src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" alt=""/>
      <h1>Hello {username}!</h1>

      <form className="app_form">
        <FormControl className="app_formControl">
          
          <Input className="app_input" placeholder="Enter a message..." value={input} onChange={e => setInput(e.target.value)} aria-describedby="my-helper-text" />
          <IconButton className="app_iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
        
      </form>

      
      {
        messages ?
        messages.map((message, k) => {
          return <Message message={message.fields.fields.mapValue.fields.message.mapValue.fields.stringValue.stringValue} username={message.fields.fields.mapValue.fields.username.mapValue.fields.stringValue.stringValue} thisUser={username} />
        }):""
      }
      
      
    </div>
  );
}

export default App;
