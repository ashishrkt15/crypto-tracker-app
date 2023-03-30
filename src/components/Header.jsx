import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';





import React from "react";
import { useNavigate } from "react-router";
import { CryptoState } from "../CryptoContext.jsx";
import AuthModal from "./Authentication/AuthModal.js";
import UserSidebar from "./Authentication/UserSidebar.js";



const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "yellow",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const { currency, setCurrency  , user } = CryptoState();
  // console.log(currency);

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#0000FF",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <AppBar color="primary" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h4"
            >
              {" "}
              Crypto Hunter{" "}
            </Typography>

            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 25,
                color:"gold",
                borderColor:"white",
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>

           { user?<UserSidebar />:  <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
