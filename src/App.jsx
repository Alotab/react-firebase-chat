
import './App.css'
import Chat from './componemts/chat/Chat'
import Detail from './componemts/detail/Detail'
import List from './componemts/list/List'

function App() {
  

  return (
    <>
      <div className='container'>
        <List />
        <Chat />
        <Detail />
      </div>
    </>
  )
}

export default App
