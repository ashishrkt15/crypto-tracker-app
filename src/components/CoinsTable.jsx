import React, { useState } from "react";
import axios from "axios";
import { CoinList } from "../config/api.jsx";
import { CryptoState } from "../CryptoContext.jsx";
import { useEffect } from "react";
import {
  Container,
  
  LinearProgress,
 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
 

import { makeStyles } from '@material-ui/core/styles';

import { ThemeProvider ,  createTheme } from '@material-ui/core/styles';
import { Pagination } from "@material-ui/lab";

import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel.jsx";






const CoinsTable = () => {
  const navigate = useNavigate();

  
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  
  

  const { currency, symbol  , coins , loading , fetchCoins} = CryptoState();

 

  // console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      main: "white",
    },
    type: "dark",
  });

  const handleSearch = () => {
    return coins?.filter(
      (coin) =>
        coin?.name.toLowerCase().includes(search) ||
        coin?.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "hsla(0, 10%, 50%, 1)",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "hsla(356, 8%, 26%, 1)",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      '& .Mui-selected': {
        backgroundColor: 'red',
        color:'black',
       },
      "& .MuiPaginationItem-root": {
        color: "#350AF6"
       }
      
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        style={{
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontFamily: "Montserrat",
          }}
        >
          Cryptocurrency Price by market Cap
        </Typography>

        <TextField
          label="search for a Crypto Currency.."
          variant="outlined"
          style={{
            marginBottom: 20,
            width: "100%",
            color:"white"
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "800",
                        fontFamily: "Montserrat",
                        fontSize:19
                        
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 20,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>

                            <span
                              style={{
                                color: "white",
                              }}
                            >
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14 , 203 , 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
