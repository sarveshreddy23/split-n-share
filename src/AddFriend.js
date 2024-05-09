import { useState } from 'react';
import './App.css';

function AddFriend( props ){
    const [friendName, setFriendName] = useState("");
  
    function handleFriendTextBoxChange(e){
      setFriendName(e.target.value);
    }
  
    return(
      <div className='p-2 m-2 d-flex flex-column add-friend-section'>
        <form className='p-3'>
          <input type='text' value={friendName} placeholder='Enter friend Name' className='text-box' onChange={handleFriendTextBoxChange} autoFocus></input>
          <button type='submit' className='btn btn-warning' style={{height:"45px"}} onClick={(e) => {e.preventDefault();  props.addFriendToList(friendName); setFriendName("")}}>Add Friend</button>
        </form>
      </div>
    );
  }

  export default AddFriend;