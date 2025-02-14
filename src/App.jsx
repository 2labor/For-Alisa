import './scss/app.scss'


import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Mail from './pages/Mail'
import Memories from './pages/Memories'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { Provider } from 'react-redux'
import store from './redux/store'
import Notification from './components/Notification'
import LetterNotificationManager from './components/LetterNotificationManager'
import "leaflet/dist/leaflet.css";

function App() {

  return (
    <Provider store={store}>
      <div>

        <LetterNotificationManager/>
        <Notification/>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Home/>} /> 
          <Route path='mail' element={<Mail/>} /> 
          <Route path='inventory' element={<Inventory/>} /> 
          <Route path='archive' element={<Memories/>} /> 
        </Route>
      </Routes>
      </div>
    </Provider>
  )
}

export default App
