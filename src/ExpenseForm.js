import { useEffect, useState } from 'react';
import './App.css';

function ExpenseForm({friend, updateBalance}){
    const [totalBill, setTotalBill] = useState();
    const [yourShare, setYourShare] = useState();
    const [friendShare, setFriendShare] = useState();
    const [spender, setSpender] = useState(0);
  
    
    useEffect(()=>{
      setTotalBill("");
      setYourShare("");
      setFriendShare("");
      setSpender(0);
    },[friend])
  
    const onOptionChangeHandler = (e) => {
      setSpender(e.target.value);
    }
  
    const onFormSubmitHandler = (e) => {
      e.preventDefault();
      let balance =0;
      if(spender ===0){
        console.log("spener: "+spender)
        balance = yourShare;
      } else {
        console.log("spener: "+spender)
        balance = (friendShare>0) ? friendShare*-1 : friendShare
      }
      updateBalance(balance);
  
    }
  
    const onFormResetHandler = (e) => {
      setTotalBill("");
      setYourShare("");
      setFriendShare("");
      setSpender(0);
    }
  
    return(
      <div className='friens-section'>
        <div className='m-3'>
        <h2>SHARE EXPENSE WITH {friend.name.toUpperCase()}</h2>
        </div>
        <form className='d-flex flex-column' onSubmit={onFormSubmitHandler} onReset={onFormResetHandler}>
              <div className='row m-2'>
                  <div className='col'>
                    <h4>Who is paying the bill</h4>
                    </div>
                  <div className='col'>
                    <select name='friends' value={spender} onChange={onOptionChangeHandler} className='d-flex flex-grow-1 text-box' style={{"height":"45px"}}>
                      <option value={0}>Me</option>
                      <option value={1}>{friend.name}</option>
                    </select>
                  </div>
              </div>
              <div className='row m-2'>
                  <div className='col'>
                    <h4>Total Bill</h4></div>
                  <div className='col'>
                    <input type='text' className='d-flex flex-grow-1 text-box' value={totalBill} onChange={(e) => setTotalBill(e.target.value)} ></input>
                  </div>
              </div>
              <div className='row m-2'>
                  <div className='col'>
                    <h4>Your share in the bill</h4></div>
                  <div className='col'>
                    <input type='text' className='d-flex flex-grow-1 text-box' value={yourShare} onChange={(e) => setYourShare(e.target.value)} onBlur={(e) =>{setFriendShare((totalBill-yourShare).toString())}}></input>
                  </div>
              </div>
              <div className='row m-2 '>
                  <div className='col align-items-center'>
                    <h4>{friend.name} share in the bill</h4></div>
                  <div className='col'>
                    <input type='text' value={friendShare} onChange={(e) => {setFriendShare(e.target.value)}} className='d-flex flex-grow-1 disabled-text-box' disabled></input>
                  </div>
              </div>
              <div className='row m-3 d-flex justify-content-center'>
                <div className='col col-auto'>
                <button type='submit' className='btn btn-warning btn-lg'>Split Bill</button>
                </div>
                <div className='col col-auto'>
                <button type='reset' className='btn btn-secondary btn-lg'>Cancel</button>
                </div>
              </div>
          </form>
      </div>
    )
  };


  export default ExpenseForm;
  