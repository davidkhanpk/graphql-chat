import React, {useEffect} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Speech = ({ audio }) => {
  const { finalTranscript, resetTranscript } = useSpeechRecognition()
  useEffect(() => {
      console.log(finalTranscript)
      if(audio) {
          console.log("listening")
        SpeechRecognition.startListening({ continuous: true, language: "en-US" })
      } else {
        console.log("listening stped")
        SpeechRecognition.stopListening()
      }
  },[audio]); //Pass Array as second argument
  useEffect(() => {
    console.log(finalTranscript)
},[finalTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div className="speech-text">
      <p>{finalTranscript}</p>
    </div>
  )
}
export default Speech