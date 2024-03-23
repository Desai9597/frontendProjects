import { useReducer } from 'react';
import CartContext from './cart-context';


const defaultCartState = {
    items: [],
    totalAmount: 0
};

//reducer receives 2 args state and action automatically from the react.
//The action is dispatched by you later, 
//and state is the last state snapshot of the state managed by the reducer.
//Also you have to return the new snapshot of the state
const cartReducer = (state, action) => {
    if(action.type === 'ADD'){
       
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        //findIndex is a built in function in javascript that runs for every array element,
        //returns index of the element based on the logic of the function defined in its argument.
        // The parameter arrow function here runs for every array element and returns true if it is already present in the array,
        //other wise false.
        const existingCartItemIndex = state.items.findIndex((item) => 
            item.id === action.item.id
        );

        const existingCartItem = state.items[existingCartItemIndex];

       
        let updatedItems;
        if(existingCartItem){
            let updatedItem;
            updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };

            //creating new array without changing the old array already in memory.
            //copy already items and then update the item we are working on
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else{
            //concat method adds new item in array 
             //but it doesnt edits existing array, instead returns new array.
             updatedItems = state.items.concat(action.item); 
        }

        //returning new state snapshot
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if(action.type === 'REMOVE'){
        const existingCartItemIndex  = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;

        if(existingItem.amount === 1){
            //filter will keep the item if index is found,
            //or will get rid of it in the the new array finally returned
            updatedItems = state.items.filter(item => item.id !== action.id)
        }else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

         //returning new state snapshot
         return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
};

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCartState);
   
   //create an object to pass as argument to dispatchCartAction,
   //having some key value pair to identify type of action and
   //also we need the item to be forwarded to reducer as a part of dispatch action,
   //so as to add
    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;