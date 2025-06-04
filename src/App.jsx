import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import ListeningPractice from './Pages/ListeningPractice'
import RecentPlayed from './Pages/RecentPlayed'
import TermsConditions from './Pages/TermsConditions'
import TrialQuestions from './Pages/TrialQuestions'
import TrialQuestions2 from './Pages/TrialQuestions2'
import Congratulations from './Pages/Congratulations'
import CompetitionQuestions from './Pages/CompetitionQuestions'
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <>
      {/* <BrowserRouter basename="/abacus">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/listening-practice' element={<PrivateRoute><ListeningPractice /></PrivateRoute>} />
          <Route path='/recent-played' element={<PrivateRoute><RecentPlayed /></PrivateRoute>} />
          <Route path='/termsandconditions' element={<PrivateRoute><TermsConditions /></PrivateRoute>} />
          <Route path='/trial-questions' element={<PrivateRoute><TrialQuestions /></PrivateRoute>} />
          <Route path='/trial-question' element={<PrivateRoute><TrialQuestions2 /></PrivateRoute>} />
          <Route path='/congratulations' element={<PrivateRoute><Congratulations /></PrivateRoute>} />
          <Route path='/competition-questions' element={<PrivateRoute><CompetitionQuestions /></PrivateRoute>} />
        </Routes>
      </BrowserRouter> */}


      <BrowserRouter basename="/abacus">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/listening-practice' element={<ListeningPractice />} />
          <Route path='/recent-played' element={<RecentPlayed />} />
          <Route path='/termsandconditions' element={<TermsConditions />} />
          <Route path='/trial-questions' element={<TrialQuestions />} />
          <Route path='/trial-question' element={<TrialQuestions2 />} />
          <Route path='/congratulations' element={<Congratulations />} />
          <Route path='/competition-questions' element={<CompetitionQuestions />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
