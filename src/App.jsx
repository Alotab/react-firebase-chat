
import { useEffect } from 'react'
import './App.css'
import Chat from './componemts/chat/Chat'
import Detail from './componemts/detail/Detail'
import List from './componemts/list/List'
import Login from './componemts/login/Login'
import Notification from './componemts/notification/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import { useChatStore } from './lib/chatStore'


const App = ()=> {

  const { currentUser, isloading, fetchUserInfo } = useUserStore();
  const {chatId } = useChatStore();
  
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user)=>{
      fetchUserInfo(user.uid);
    });

    return () => {
      unSub();
    }
  }, [fetchUserInfo]);
  
  // const user = false;
  if (isloading) return <div className='loading'>Loading ...</div>
  return (
    <>
      <div className='container'>
        { currentUser ? (
            <>
                <List />
                {chatId && <Chat />}
                {chatId && <Detail />}
            </>
           
          ) : (<Login />)
        }
        <Notification />
      </div>
    </>
  )
}

export default App
