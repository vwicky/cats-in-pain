import React, { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import './ChatPage.css'
import { useSearchParams } from 'react-router'
import { useUser } from '../hooks/useUser'

const mockPromptItem = {
  date: new Date().toDateString(),
  summarization: "lorem ipsum dorem your cat was healthy ...",
  result: {
    healthy: 83,
    ill: 17,
  }
}

function ChatPage() {
  const [prompts, setPrompts] = useState([])
  const [result, setResult] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false)

  const [prompt, setPrompt] = useState(null);

  const {data: user, isLoading} = useUser();

  const [searchParams] = useSearchParams();
  const incomingPrompt = searchParams.get('prompt') || '';

  const [currentTextInput, setCurrentTextInput] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null);

  // for a time being
  const makeMockOutput = async (waitTime) => {
    const randomHealthyPercent = Math.round(Math.random() * 100);
    const randomExplanations = {
      positive: "Cat looks fine and healthy",
      negative: "The cat shows signs of headache",
    }
    const mockResult = {
      healthy: randomHealthyPercent,
      ill: 100 - randomHealthyPercent,
      additional: {
        explanation: (randomHealthyPercent > 50) ? randomExplanations.positive : randomExplanations.negative
      }
    }
    setIsWaiting(true)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsWaiting(false)
    return mockResult
  }
  const makeMockInput = () => {
    const mockInput = {
      type: "text",
      data: {
        text: "Lorem ipsum dolor sit amet ducimus!"
      }
    }
    return mockInput
  }
  const makeMockHistoryItem = (historyItem) => {
    return (
      <p>{historyItem.date} | {historyItem.summarization} | healthy: {historyItem.result.healthy}%, ill: {historyItem.result.ill}% </p>
    )
  }

  const makeInput = () => {
    const input = {
      type: "text",
      data: {
        text: currentTextInput
      }
    }
    return input
  }

  const saveInDB = async (promptItem) => {
    const resultData = promptItem

    const response = await fetch('http://localhost:5000/prompts/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultData)
    });
    const userResponse = await response.json();

    console.log(userResponse);
    return userResponse
  }
  const saveFavouritePromptInDB = async () => {
    const sprompt = {
      userId: user._id,
      promptId: prompt._id
    }
    const response = await fetch('http://localhost:5000/sprompts/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sprompt)
    });
    const userResponse = await response.json();

    console.log(userResponse);
    return userResponse
  }

  const generateResult = async () => {
    if (isWaiting) {
      alert('Please, wait for previous response to generate')
      return
    }

    // TODO: change to normal generation
    const input = makeInput()
    const result = await makeMockOutput()

    console.log(user);
    
    const promptItem = {
      userId: user._id,
      date: new Date().toISOString(),
      summarization: input.data.text,
      result: result
    }
    
    const response = await saveInDB(promptItem)
    console.log(response);
    setPrompt(response)

    setResult(result)
    setPrompts(prev => [promptItem, ...prev])
  }

  return (
    <div className='chatpage'>
      <Header />

      <div className="chat-container">
        <div className="prompt-result-container">
          <div className="left">
            <h2>prompting here</h2>

            <label htmlFor="text">Input text prompt</label>
            <input type="text" name='text' placeholder={incomingPrompt} onChange={(e) => setCurrentTextInput(e.target.value)}/>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setUploadedImage(imageUrl);
                }
              }}
            />
            {uploadedImage && (
              <div className="image-preview">
                <p>Uploaded image:</p>
                <img src={uploadedImage} alt="Uploaded preview" />
              </div>
            )}

            <button onClick={generateResult}>Generate Results</button>
            <button
  onClick={() => {
    if (!currentTextInput) {
      alert('Please enter a prompt before saving.');
      return;
    }
    saveFavouritePromptInDB()
    alert('Prompt saved!');
  }}
  className="save-button"
>
  Save Prompt
</button>

          </div>
          <div className="right">
            <h2>results here</h2>

            {
              isWaiting ?
                  (<div className="loader" />) :
                  result === null ?
                    (<p>waiting for prompt</p>) :
                    (<div className="result-animation result-bar-container">
                      <h3>Health Analysis</h3>
                      <div className="bar-chart">
                        <div
                          className="bar healthy"
                          style={{ width: `${result.healthy}%` }}
                        >
                          {result.healthy}% Healthy
                        </div>
                        <div
                          className="bar ill"
                          style={{ width: `${result.ill}%` }}
                        >
                          {result.ill}% Not Healthy
                        </div>
                      </div>
                      <p className="explanation">📝 {result.additional.explanation}</p>
                    </div>)
            }
          </div>
        </div>
        <div className="prompt-history">
          <h2>prompt history</h2>
          {
            prompts.length < 1 ?
              (<><p>nothing to display</p></>) : 
              prompts.map(prompt => (
                <div className='item'>
                  {makeMockHistoryItem(prompt)}
                </div>
              ))
          }
        </div>

      </div>
      
      <Footer />
    </div>
  )
}

export default ChatPage
