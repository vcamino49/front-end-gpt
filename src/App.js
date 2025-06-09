
import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [chat, setChat] = useState('');

  const backendUrl = 'https://visionbuilder-backend-v4-1.onrender.com';

  const handleGenerate = async () => {
    const res = await fetch(backendUrl + '/api/generate', {
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

    const res = await fetch(backendUrl + '/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    setImage(data.imageUrl);
  };

  const handleChat = async () => {
    const res = await fetch(backendUrl + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });
    const data = await res.json();
    setChat(data.reply);
  };

  return (
    <div className="App">
      <h1>VisionBuilder</h1>
      <input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Enter prompt..." />
      <div>
        <button onClick={handleGenerate}>Generate Image</button>
        <button onClick={handleChat}>Ask ChatGPT</button>
      </div>
      <input type="file" onChange={handleUpload} />
      {result && <div><h3>Generated:</h3><p>{result.text}</p><img src={result.image_url} alt="Generated" width="300" /></div>}
      {image && <div><h3>Uploaded Image:</h3><img src={image} alt="Uploaded" width="300" /></div>}
      {chat && <div><h3>ChatGPT Response:</h3><p>{chat}</p></div>}
    </div>
  );
}

export default App;
