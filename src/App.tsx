import React, { useState } from 'react';
import { Book, Mic, PenTool, Brain } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';

function App() {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();
  const { speak, cancel } = useSpeechSynthesis();

  const handleSpeech = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopSpeech = () => {
    SpeechRecognition.stopListening();
    setText(text + ' ' + transcript);
    resetTranscript();
  };

  const handleReadAloud = () => {
    speak({ text: text });
  };

  const handleStopReading = () => {
    cancel();
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAskQuestion = () => {
    // Simulating AI response (replace with actual AI integration)
    setAnswer(`Here's a simulated answer to your question: "${question}". In a real implementation, this would be connected to an AI service to provide accurate responses.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">AI-Powered Virtual Assistant for Students</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center"><Book className="mr-2" /> Textbook Reader</h2>
          <textarea
            className="w-full h-40 p-2 border rounded mb-4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your textbook content here or use voice commands to input text..."
          />
          <div className="flex space-x-4">
            <button onClick={handleReadAloud} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Read Aloud
            </button>
            <button onClick={handleStopReading} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Stop Reading
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center"><Mic className="mr-2" /> Voice Commands</h2>
          <p className="mb-4">Click the button and speak to input text or take notes.</p>
          <div className="flex space-x-4 mb-4">
            <button onClick={handleSpeech} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Start Speaking
            </button>
            <button onClick={stopSpeech} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Stop Speaking
            </button>
          </div>
          <p className="font-semibold">Transcript:</p>
          <p className="mt-2">{transcript}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center"><PenTool className="mr-2" /> Note-Taking</h2>
          <textarea
            className="w-full h-40 p-2 border rounded"
            value={notes}
            onChange={handleNoteChange}
            placeholder="Take notes here..."
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center"><Brain className="mr-2" /> AI Tutor</h2>
          <p className="mb-4">Ask questions about your studies, and our AI tutor will provide answers.</p>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Ask a question..."
            value={question}
            onChange={handleQuestionChange}
          />
          <button 
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            onClick={handleAskQuestion}
          >
            Get Answer
          </button>
          {answer && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="font-semibold">Answer:</p>
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;