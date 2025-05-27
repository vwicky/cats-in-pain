import React, { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import './ChatPage.css'

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

  const generateResult = async () => {
    // TODO: change to normal generation
    const input = makeMockInput()
    const result = await makeMockOutput()

    const promptItem = {
      date: new Date().toISOString(),
      summarization: input.data.text,
      result: result
    }

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
            <input type="text" name='text'/>
            <input type="file" />

            <button onClick={generateResult}>Generate Results</button>
          </div>
          <div className="right">
            <h2>resultshere</h2>

            {
              isWaiting ?
                  (<p>generating response⚖</p>) :
                  result === null ?
                    (<p>waiting for prompt</p>) :
                    (<>
                      <p>results are: healthy {result.healthy}%, ill: {result.ill}%</p>
                      <p>explanation: {result.additional.explanation}</p>
                    </>)
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
