import React, { useContext, useRef, useState } from "react"
import MyContext from "../cotext/context"
const Inventory = () => {
  const { myInventory, myCart, myCartHandler, setMyInventory } =
    useContext(MyContext)
  const [itemQuantities, setItemQuantities] = useState({})
  const inpRef = useRef()

  const addToCart = (name) => {
    const itemToAdd = myInventory.find((item) => item.name === name)
    const hasKey = itemQuantities.hasOwnProperty(name)
    let itemQuantity = 0
    if (hasKey) {
      itemQuantity = itemQuantities[name]
    } else {
      itemQuantity = 1
    }

    myCartHandler({ ...itemToAdd, qnt: itemQuantity })

    const updatedInventory = myInventory
      .map((item) =>
        item.name === name ? { ...item, qnt: item.qnt - itemQuantity } : item
      )
      .filter((item) => item.qnt !== 0)

    setMyInventory(updatedInventory)
    inpRef.current.value = null
  }

  const handleQuantityChange = (name, value) => {
    setItemQuantities({ ...itemQuantities, [name]: value })
  }

  return (
    <div className=" flex  justify-center mt-8">
      <div className=" bg-slate-600 p-4  flex rounded-md justify-center w-[70%]">
        <ul className=" w-[100%] border-slate-400  rounded-md border-solid ">
          <li className="flex  px-2  text-white border-slate-600 border-solid border-2  rounded-md w-[100%]">
            <div className="flex  w-[21%] items-center">
              <div className="w-[100%]   ">
                <h1 className="font-bold">Name</h1>
              </div>
            </div>
            <div className="flex  font-bold   w-[30%] items-center">
              <div className="w-[100%] ml-2  ">
                <h1>Description</h1>
              </div>
            </div>
            <div className="flex font-bold   w-[15%] items-center">
              <div className="w-[100%] flex justify-end  whitespace-pre-wrap">
                <h1>Price</h1>
              </div>
            </div>
            <div className="flex  font-bold w-[15%] items-center">
              <div className="w-[100%] flex justify-end  whitespace-pre-wrap">
                <h1>Quantity</h1>
              </div>
            </div>
          </li>
          {myInventory.length > 0 ? (
            myInventory.map((item) => {
              return (
                <li className="flex p-1 px-2 justify-between bg-pink-200 border-slate-600 border-solid border-2  rounded-md w-[100%]">
                  <div className="flex   w-[20%] items-center">
                    <div className="w-[100%] text-black  ">
                      <h1 className="text-black">{item.name}</h1>
                    </div>
                  </div>
                  <div className="flex   w-[30%] items-center">
                    <div className="w-[100%]  ">
                      <h1>{item.des}</h1>
                    </div>
                  </div>
                  <div className="flex   w-[10%] items-center">
                    <div className="w-[100%] flex justify-end  whitespace-pre-wrap">
                      <h1>{item.price}</h1>
                    </div>
                  </div>
                  <div className="flex   w-[10%] items-center">
                    <div className="w-[100%] flex justify-end  whitespace-pre-wrap">
                      <h1>{item.qnt}</h1>
                    </div>
                  </div>
                  <div className="flex   w-[10%] items-center">
                    <div className="w-[100%] flex justify-end  whitespace-pre-wrap">
                      <input
                        className=" w-[60%] rounded-sm focus:outline-none p-1 text-sm "
                        type="number"
                        ref={inpRef}
                        onChange={(e) => {
                          handleQuantityChange(item.name, e.target.value)
                        }}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        addToCart(item.name)
                      }}
                      className=" p-3 py-2 font-bold text-sm text-white bg-slate-500 rounded-md "
                    >
                      Add Item
                    </button>
                  </div>
                </li>
              )
            })
          ) : (
            <h1 className="text-white text-center">No Item In Inventory!</h1>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Inventory
