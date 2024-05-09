import { useState } from 'react';
import './App.css';
import ExpenseForm from './ExpenseForm';
import AddFriend from './AddFriend';


let initialFrns = [
  {
    "id":1,
    "name":"person one",
    "balance":20
  },
  {
    "id":2,
    "name":"person two",
    "balance":-7
  },
  {
    "id":3,
    "name":"Person three",
    "balance":0
  }
];

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendsList, setFriendsList] = useState(initialFrns);
  const [selectedFriend, setSelectedFriend] = useState();

    function handleShowAddFriend() {
      setShowAddFriend((show) => !show);
    }

    function addFriendToList(fname) {
        if(fname.length>0) {
          let friendObj = {
            id: friendsList.length+1,
            balance: 0,
            name: fname
          }
          setFriendsList([...friendsList, friendObj]);
          setShowAddFriend(false);
        }
    }

    const setSelectedFriendHandler = (friend) => {

      if(friend.id === selectedFriend?.id) setSelectedFriend(null);
      else {
        setSelectedFriend(friend);
        setShowAddFriend(false); 
      }
    }

    const updateBalance = (balance) => {

    let tempList = friendsList;

    for(let i =0; i<tempList.length; i++){
      if(tempList[i].id === selectedFriend.id)   tempList[i].balance =  (+tempList[i].balance) + (+balance);
    }
    setFriendsList([...tempList])
    }

  return (
    <div className="App">
      <div className='left-side'>
        <FriendList friends={friendsList} selectedFriend={selectedFriend} setSelectedFriendHandler={setSelectedFriendHandler} />
          { showAddFriend && <AddFriend addFriendToList={addFriendToList} />}
          <div className='d-flex justify-content-end m-2' style={{width:"100%"}}>
              <button className='btn btn-warning' onClick={handleShowAddFriend}>{ !(showAddFriend) ? "Add New Friend" : "Close"}</button>
          </div>
      </div>
      <div className='right-side'>
        { selectedFriend && <ExpenseForm friend = {selectedFriend} updateBalance={updateBalance}/> }
      </div>
    </div>
  );
}


function FriendList({friends, selectedFriend, setSelectedFriendHandler}) {
  return(
    <div className='friens-section p-2 mx-5'>
  {friends.map(friend => (<div key={friend.id}>{<Friend friend={friend} selectedFriend={selectedFriend} setSelectedFriendHandler={setSelectedFriendHandler}/>}</div>))}
    </div>

  )
};

function  Friend({friend, selectedFriend, setSelectedFriendHandler}){

  let isSelected = (selectedFriend?.id === friend.id)

const onFormSubmitHandler = (e) => {
  e.preventDefault();
  setSelectedFriendHandler(friend);
}

  return(
  <form className='row bg-white pe-2 m-2' onSubmit={onFormSubmitHandler}>
    <div className='col col-auto ps-4 d-flex align-items-center'>
      <ProfileImage profileName={friend.name} />
    </div>
    <div className='col col-* d-flex flex-column align-items-start pt-3'>
        <h4 className='grow-1'>{friend.name}</h4>
        { (friend.balance<0) && <p className='Red'>You owe {friend.name} ${Math.abs(friend.balance)}.</p>}
        { (friend.balance>0) && <p className='Green'>{friend.name} owes you ${Math.abs(friend.balance)}.</p>}
        { (friend.balance === 0) && <p >You and {friend.name} are even.</p>}
      </div>
      <div className='col col-auto d-flex align-items-center justify-items-end'>
        <button type="submit" className={(isSelected) ? 'btn btn-secondary' : 'btn btn-warning'}>{ (isSelected) ? "Close" : "Select"}</button>
      </div>
  </form>
  );
}

function ProfileImage({profileName}) {
  let str = profileName.split(" ");
  let shortName = (str.length > 1) ? str[0].charAt(0)+str[1].charAt(0) : str[0].charAt(0);
  return(
    <div className='profileImage'>{shortName}</div>
  );
}



export default App;
