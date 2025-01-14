
import './App.css'
import Chat from './componemts/chat/Chat'
import Detail from './componemts/detail/Detail'
import List from './componemts/list/List'
import Login from './componemts/login/Login'
import Notification from './componemts/notification/Notification'


const App = ()=> {
  
  const user = true;
  return (
    <>
      <div className='container'>
        { user ? (
            <>
                <List />
                <Chat />
                <Detail />
            </>
           
          ) : (<Login />)
        }
        <Notification />
      </div>
    </>
  )
}

export default App
