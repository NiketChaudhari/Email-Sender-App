import * as React from "react";
import { useEffect, useState } from "react";
const axios = require('axios');


import "./my_style.css";
import Speech from 'speak-tts'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



const speech = new Speech()
speech.setRate(0.6) 
speech.setPitch(2) 
speech.setLanguage('en-IN')



const Welcome = () => {
  return (
    <div className="Welcome">
      <h1 className="Welcome_h1">Wecome To<br />Email Sender App</h1>
    </div>
  );
}


const Next = () => {

  const [myEmail, setMyEmail] = useState("")
  const [myPassword, setMyPassword] = useState("")

  const [senderEmail, setSenderEmail] = useState("")
  const [senderSubject, setSenderSubject] = useState("")
  const [senderData, setSenderData] = useState("")


  const [connectFlag, setConnectFlag] = useState(false)


  const commands = [
    {
      command: 'click Connect',
      callback: () => connctButtonClicked()
    },

    {
      command: 'Reset',
      callback: () => resetAllData()
    }
  ]


  useEffect(() => {
    SpeechRecognition.startListening({continuous:true, language : "en-IN"})
  }, [])


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands })



  // User Data :
  const emailInputChanged = (e) => {
    setMyEmail(e.target.value)
  }

  const passwordInputChanged = (e) => {
    setMyPassword(e.target.value)
  }


  // Sender Data :
  const senderEmailInputChanged = (e) => {
    setSenderEmail(e.target.value)
  }

  const senderSubjectInputChanged = (e) => {
    setSenderSubject(e.target.value)
  }

  const senderDataInputChanged = (e) => {
    setSenderData(e.target.value)
  }



  const resetAllData = () => {
    setMyEmail("")
    setMyPassword("")
  
    setSenderEmail("")
    setSenderSubject("")
    setSenderData("")


  }





  const connctButtonClicked = () => {


    if((myEmail==="") || (myPassword==="") || (senderEmail==="") || (senderSubject==="") || (senderData==="")) {
      speech.speak({
        text: `Please, Enter valid data before click on Connect button !`
      })
    }
    else{
      axios.get(`http://localhost:8000/valid/${myEmail}/${myPassword}/${senderEmail}/${senderSubject}/${senderData}`)
      .then((response) => {
        console.log(response);
        resetAllData()

        speech.speak({
          text: `Email is sent successfully !`
        })


      })
      .catch((error) => {
        console.log(error);
        speech.speak({
          text: `Oopps ! Someting is wrong, Please, check your information !`
        })

      });
    }


  }


  return (
    <div className="Next">
      <h1 className="Next_h1">Enter Your Credentials</h1>
      <div className="Next_div1">
        <input className="Next_input" value={myEmail} type="email" placeholder="Email Address" onChange={emailInputChanged} />
        <input className="Next_input" value={myPassword} type="password" placeholder="Email Password" onChange={passwordInputChanged} />
      </div>


      

      <h1 className="Next_h2">Enter Email Data</h1>
      <div className="Next_div1">
      <input className="Next_input" value={senderEmail} type="email" placeholder="Email" onChange={senderEmailInputChanged} />
      <input className="Next_input" value={senderSubject} type="text" placeholder="Subject" onChange={senderSubjectInputChanged} />

      <input  className="Next_input" value={senderData} type="text" placeholder="Email Data" onChange={senderDataInputChanged} />

      </div>

      <button className="Next_button" onClick={connctButtonClicked}>Connect</button>

    </div>
  );
}















const App = () => {

  const [flag, setFlag] = useState(false)

  useEffect(() => {
    setInterval(() => setFlag(true),
      3000
    )
  }, [])



  return (
    <div>
      {
        flag ? <Next /> : <Welcome />
      }
    </div>
  );
}
export default App;