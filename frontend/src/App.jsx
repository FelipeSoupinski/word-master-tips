import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GameView from './components/GameView';
import AudioPlayer from './components/AudioPlayer';
import './App.css';

function App() {
  return (
    <>
      <AudioPlayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign/:campaignId" element={<Home />} />
        <Route path="/campaign/:campaignId/level/:levelId/play" element={<GameView />} />
      </Routes>
    </>
  );
}

export default App;
