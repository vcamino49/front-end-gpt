import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const backendUrl = 'https://your-backend-url.onrender.com';

  const handleGenerate = async () => {
    const res = await fetch(`${backendUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setResult(data);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${backendUrl}/api/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    setImage(data.imageUrl);
  };

  const handleChat = async () => {
    const res = await fetch(`${backendUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: chatMessage })
    });
    const data = await res.json();
    setChatResponse(data.response);
  };

  return (
    <div className="App">
      <h1>VisionBuilder</h1>
      <input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Enter image prompt..." />
      <button onClick={handleGenerate}>Generate Image</button>
      <br />
      <input type="file" onChange={handleUpload} />
      {result && <div><h3>Generated Result:</h3><p>{result.text}</p><img src={result.image_url} alt="Generated" width="300" /></div>}
      {image && <div><h3>Uploaded Image:</h3><img src={image} alt="Uploaded" width="300" /></div>}
      <hr />
      <h2>Chat with VisionBuilder</h2>
      <input value={chatMessage} onChange={e => setChatMessage(e.target.value)} placeholder="Ask something..." />
      <button onClick={handleChat}>Send</button>
      {chatResponse && <p><strong>Response:</strong> {chatResponse}</p>}
    </div>
  );
}

export default App;