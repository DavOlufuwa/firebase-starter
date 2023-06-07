import './App.css'
import Auth from './components/Auth'
import Movies from './components/Movies'

function App() {

  return (
    <div className="App bg-gray-200 min-h-screen pt-[4rem]">
      <Auth />
      <Movies/>
    </div>
  )
}

export default App
