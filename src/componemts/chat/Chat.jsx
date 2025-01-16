 import React, { useEffect, useRef, useState } from 'react';
import "./chat.css";
import EmojiPciker from "emoji-picker-react"
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';
import { upload } from "../../lib/upload"


const Chat = () => {
  const [chat, setChat] = useState()
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file:null,
    url: ""
  });

  const endRef = useRef(null);

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore()
  
  const handleSnnd = async() => {
    if(text === "") return;

    let imgUrl = null;

    try{
      if(img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages:arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl}),  // if there is no img, this section will be empty
        })
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {

        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapShot = await getDoc(userChatRef);
  
        if(userChatsSnapShot.exists()){
          const userChatsData = userChatsSnapShot.data()
  
          const chatIndex = userChatsData.chats.findIndex(c=> c.chatId === chatId);
  
          userChatsData.chats[chatIndex].lastMessage = text
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();
  
          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }


      })
    }catch(err){
      console.log(err);
    }

    setImg({
      file: null,
      url: ""
    });

    setText("");
  };

  const handleImg = (e) => {
    if(e.target.files[0]){
        setImg({
            file: e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        });
    }
  };


  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  },[]);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", chatId), (res)=>{
      setChat(res.data())
    });

    return () => {
      unSub();
    };
  },[chatId]);
  
  const handleEmoji = (e) => {
    setText((prev)=> prev + e.emoji);
    setOpen(false);
    
  };

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Lorem ahsf ahsd ofle, ofef</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>

      <div className="center">
        {/* <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur provident maiores, iusto tenetur esse placeat, .</p>
            <span>1 min ago</span>
          </div>
        </div> */}

        {chat?.messages?.map((message) => {
          <div className={message.senderId === currentUser?.id ? "message own" : "message" } key={message?.createdAt}>
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
            
              <p>{message.text}</p>
              {/* <span>{message.createdAt}</span> */}
            </div>
          </div>
        })}

          {img.url && <div className="message own">
            <div className="texts">
              {<img src={img.url} alt="" />}
            </div>
          </div> }

        <div ref={endRef}> </div>
      </div>

    

      <div className="bottom">
        <div className="icons">  
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input type="file" id='file' style={{display:"none"}} onChange={handleImg}/>
          <img src="/camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" 
          placeholder={isCurrentUserBlocked || isReceiverBlocked ? "You can not send a message" : 'Type a message...'}
          value={text}
          onChange={e=> setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen(prev=> !prev)}/>
          <div className="picker">
            <EmojiPciker open={open} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className='sendButton' onClick={handleSnnd} disabled={isCurrentUserBlocked || isReceiverBlocked}>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat;