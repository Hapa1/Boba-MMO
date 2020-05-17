import React, { useState, useEffect } from 'react';
import './App.css';
import Canvas from './components/Canvas'
import { List, ListItem, ListItemAvatar, ListItemText, Divider, Box, Container, Card, CardContent, Typography, CircularProgress, LinearProgress, withStyles, makeStyles, Button, Chip} from '@material-ui/core';
import GradeIcon from '@material-ui/icons/Grade';
import Axios from 'axios';

const origin = 'http://localhost:5000'
//const origin = 'https://boba-mmo.herokuapp.com'

function App() {

  let done = false

  const [user, setUser] = useState('')
  const [users, setUsers] = useState([])
  const [bobaList, setBobaList] = useState([])
  const [bobaParams, setBobaParams] = useState(null)
  const [userXP, setUserXP] = useState(null)
  const [userLevel, setUserLevel] = useState(null)
  const [titleColor, setTitleColor] = useState(null)

  const getBoba = () => {
    let myBoba = bobaList.pop()
    //if(bobaList.length < 3){
    //  fetchBoba()
    //}
    setBobaParams(myBoba)
    return myBoba
  }


  const fetchUser = async () => {
    let res = await Axios.get(origin + '/profile',{withCredentials: true})
    setUser(res.data)
    setUserXP(res.data.xp)
    setUserLevel(res.data.level)
    
  }

  const fetchUsers = async () => {
    let res = await Axios.get(origin + '/users',{withCredentials: true})
    console.log(res.data)
    setUsers(res.data)
  }

  const fetchBoba = async () => {
    let res = await Axios.get(origin + '/boba', {withCredentials: true})
    setBobaParams(res.data.pop())
    setBobaList(res.data)
  }



  const postXP = async (xp) => {
    //var data = {
    //  xp: xp
    //}
    //Axios.post(origin + '/postXP', { data }, {withCredentials: true})
  }

  const postLevel = async (xp) => {
    Axios.post(origin + '/postLevel', {}, {withCredentials: true})
  }

  if(userXP >= 200){
    setUserLevel(userLevel+1)
    setUserXP(0)
    postLevel()
  }


  useEffect(() => {
    fetchUser()
    fetchBoba()
    fetchUsers()
  }, [])

  const useStyles = makeStyles((theme) => ({
    Legendary: {
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    Epic: {
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #aa46da 30%, #D58DED 90%)'
    },
    Rare: {
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #00aee7 30%, #5CDFF5 90%)'
    },
    Uncommon: {
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #81D481 30%, #5CB75E 90%)'
    },
    Common: {
      fontWeight: 'bold',
      backgroundColor: '#B5B5B5'
    },
    FlavorColor: {
      backgroundColor: '#B5B5B5'
    },
    experienceBar: {
      background: 'linear-gradient(90deg, #81D481 30%, #00aee7 90%)',
      color: '#B5B5B5',
      height: 10,
    },
    Level: {
      fontWeight: 'bold',
      fontSize: '24px',
    }
  }));

  const classes = useStyles();

  const getRarity = () => {
    if(bobaParams){
      switch(bobaParams.flavor.rarityType){
        case 'Legendary':
          return <Chip color="primary" icon={<GradeIcon />} className={classes.Legendary} label="LEGENDARY"/>
        case 'Epic':
          return <Chip color="primary" icon={<GradeIcon />} className={classes.Epic} label="EPIC"/>
        case 'Rare':
          return <Chip color="primary" icon={<GradeIcon />} className={classes.Rare} label="RARE"/>
        case 'Uncommon':
          return <Chip color="primary" icon={<GradeIcon />} className={classes.Uncommon} label="UNCOMMON"/>
        default:
          return <Chip color="primary" icon={<GradeIcon />} className={classes.Common} label="COMMON"/>
      }
      
    }
  }

  const getName = () => {
    if(bobaParams){
      return(
        <div>
          {bobaParams.flavor.flavorName} Tea
        </div>
      )
    }
  }

  const getClass = () => {
    if(bobaParams){
      return classes.FlavorColor
    }
  }

  const getUsers = () => {
    const usersList = users.map((myUser) =>
    <div>
      <ListItem>
        <ListItemAvatar>
          <Chip label={myUser.level} color="primary" className={classes.Level}/>
        </ListItemAvatar>
        <ListItemText primary={myUser.name}/>
      </ListItem>
      <Divider/>
    </div>
    );
    
    return <List>{usersList}</List>
  }

//<Button variant="contained" color="primary" href={origin + '/auth/facebook/'}>Login</Button>
//<Button color="primary" href={origin + '/logout/'}>Logout</Button>
  const getLanding = () => {
    if(user){
      return (
        <div>
          <Container maxWidth="sm">
          <Box display="flex" justifyContent="center">
            <Typography  color="primary" variant="h5">
              <b>Level</b>
            </Typography>
            <Chip label={userLevel} color="primary" className={classes.Level}/>
            <Button color="primary" href={origin + '/logout/'}>Logout</Button>
          </Box>
            
          <Box>
            <LinearProgress variant="determinate" value={userXP/200 * 100} className={classes.experienceBar}/>
          </Box>
            
          </Container>
            <Canvas 
            
            postXP={postXP} 
            getBoba={getBoba} 
            setBobaParams={setBobaParams} 
            bobaParams={bobaParams}
            userXP={userXP}
            setUserXP={setUserXP}
            setTitleColor={setTitleColor}
            getRarity={getRarity}
            getName={getName}
            />
          
        </div>
      )
    } else {
      return (
        <Button variant="contained" color="primary" href={origin + '/auth/facebook/'}>Login</Button>
      )
    }
  }

  return (
    <div className="App">
      {getLanding()}
      <Box>
        <Typography  color="primary" variant="h3">
          Leaderboard
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" Width="m">
    
        {getUsers()}
      </Box>
    </div>

  );
}

export default App;
