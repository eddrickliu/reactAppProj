import React from 'react';
import './App.css';
import {Button} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as constants from "./constants"
const axios = require('axios');


const fetchBlogPost = () =>{
    //return axios.get('https://www.googleapis.com/blogger/v3/blogs/3213900?key=' + constants.API_KEY)
    return axios.get('https://www.googleapis.com/blogger/v3/blogs/byurl?url=http://code.blogger.com/?key=' + constants.API_KEY)
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

function App(){
    const [openDialog, setOpenDialog] = React.useState(false)
    return (
        <div className="App" direction="column">
            <Card>
                <Button variant="contained" color="primary" onClick={()=>setOpenDialog(!openDialog)}>Lets cum!</Button>
            </Card>
            <Dialog
                open={openDialog}
            >
                     <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
            </Dialog>
        </ div>
    )
}

export default App;
