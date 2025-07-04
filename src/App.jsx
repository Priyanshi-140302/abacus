import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import ListeningPractice from './Pages/ListeningPractice'
import RecentPlayed from './Pages/RecentPlayed'
import TermsConditions from './Pages/TermsConditions'
import TrialQuestions from './Pages/TrialQuestions'

import Congratulations from './Pages/Congratulations'
import CompetitionQuestions from './Pages/CompetitionQuestions'
import PrivateRoute from './components/PrivateRoute';
import Profile from './Pages/Profile';
import FaceRecognitionLogin from './components/FaceRecogination';

function App() {

  return (
    <>
      <BrowserRouter basename="/listening">
        <Routes>
          <Route path='/login' element={<FaceRecognitionLogin />} />
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/listening-practice' element={<PrivateRoute><ListeningPractice /></PrivateRoute>} />
          <Route path='/recent-played/:id' element={<PrivateRoute><RecentPlayed /></PrivateRoute>} />
          <Route path='/termsandconditions' element={<PrivateRoute><TermsConditions /></PrivateRoute>} />
          <Route path='/trial-questions' element={<PrivateRoute><TrialQuestions /></PrivateRoute>} />

          <Route path='/congratulations' element={<PrivateRoute><Congratulations /></PrivateRoute>} />
          <Route path='/competition-questions' element={<PrivateRoute><CompetitionQuestions /></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
