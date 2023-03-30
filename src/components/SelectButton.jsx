import { makeStyles } from '@material-ui/core'

import React  from 'react'

const SelectButton = ({children , selected , onClick}) => {
    const useStyles = makeStyles({
        selectbutton: {
            border: "1px solid gold" ,
            borderRadius:4,
            borderColor:"black" ,
            padding:10 ,
            paddingLeft:20 ,
            paddingRight:20 ,
            fontFamily:"Monserrat",
            cursor:"pointer" ,
            backgroundColor: selected ? "gold" : "" ,
            color: selected ? "black" : "",
            fontWeight: selected ? 850 : 600 ,
            "&:hover" :{
                backgroundColor:"gold" ,
                color: "black",
            },
            width:"15%",
        }

     }) ;

    const classes = useStyles() ;
  return (
      <span onClick={onClick}
      className={classes.selectbutton}
      >
      {children}
        </span>
    
  )
}

export default SelectButton
