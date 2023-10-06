import React, { useState } from "react"
import MyContext from "./context"
const DataProvider = (props) => {
  const [myInventory, setMyInventory] = useState([])
  const [myCart, setMyCart] = useState([])
  const myCartHandler = (newItem) => {
    setMyCart((pre) => {
      return [...pre, newItem]
    })
  }
  console.log(myInventory)
  console.log(myCart)
  const myInventoryHandler = (newItem) => {
    setMyInventory((pre) => {
      return [...pre, newItem]
    })
  }

  return (
    <MyContext.Provider
      value={{
        myInventory,
        myInventoryHandler,
        myCartHandler,
        myCart,
        setMyInventory,
      }}
    >
      {props.children}
    </MyContext.Provider>
  )
}

export default DataProvider
