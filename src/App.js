import logo from './logo.svg';
import './App.css';
import React from 'react';
const axios = require('axios');

function App() {
  const [counter,setCounter] = React.useState(0);
  const [userData, setUserData] = React.useState('');
  const [userInfos, setUserInfos] = React.useState([]);
  const [nextPageNumber, setNextPageNumber] = React.useState(1);

  const fetchNextUser = () => {
    fetchRandomData(nextPageNumber).then((randomData)=>{
      if(randomData === undefined) return
      setUserData(JSON.stringify(randomData, null, 2)  || "No response to show");
      const newUserInfo = [
        ...userInfos,
        ...randomData.results
      ]
      setUserInfos(newUserInfo);
      setNextPageNumber(randomData.info.page + 1);
    })
  } 

  React.useEffect(()=>{
    //fetchNextCall here
    fetchNextUser()
  },[]) 

  return ( 
    <div className="App" direction="column">
      <h1>Hello Code Sandbox</h1>
      <h2>Edits here</h2>
      <p>{counter}</p>
      <button 
        onClick={
          ()=>setCounter(counter+1)
        }
      >Add To Count
      </button>
      <button 
        onClick={
          ()=>fetchNextUser()
        }
      >Fetch Next User
      </button>
      { 
        userInfos.map((userInfo,idx) => (
          <div key={idx}>
            <p>
              {getFullUserName(userInfo )}
            </p>
            <img src={userInfo.picture.large}/>
           </div> 
        ))
      }
      {/* <pre>{userData}</pre> */}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

const fetchRandomData = (pageNumber = 1) =>{
  return axios.get('https://randomuser.me/api?pageNumber=${pageNumber}')
  .then(({data}) => {
    // handle success
    console.log(data);
    return data;
  })
  .catch(error => {
    // handle error
    console.log(error);
  }); 
}

const getFullUserName = (userInfo) => {
  const {name: {first, last}} = userInfo
  return `${first} ${last}`
}

export default App;
