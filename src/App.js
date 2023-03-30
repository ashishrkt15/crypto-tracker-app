import { makeStyles } from "@material-ui/core";
// import { Alert } from "@material-ui/lab";

import { BrowserRouter  , Routes , Route } from "react-router-dom"

import './App.css';
import Header from "./components/Header.jsx";
import CoinPage from "./Pages/CoinPage.jsx";
// import Homepage from "./Pages/Homepage.jsx";
// import { makeStyles } from '@mui/styles';
import Homepage from "./Pages/Homepage.jsx";
import  Alert  from "./components/Alert.js"; 
 
function App() {
 
  const useStyles = makeStyles(() => ({
      App: {
        // backgroundColor:'#848dad',
        backgroundColor:'	rgb(255,245,238)',

        color:"black",
        minHeight:"100vh",
        
      }, 
  }));
  const classes = useStyles() ; 

  return (
    <BrowserRouter>
   
      <div className={classes.App}>
        <Header />
        <Routes>
        <Route path="/" Component={Homepage} exact />
        <Route path="/coins/:id" Component={CoinPage} exact />

        </Routes>

      </div>
      <Alert />

    
    </BrowserRouter>
  );
}

export default App;
