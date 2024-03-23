import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    //curNumber will be the value that will be carried forward from the last execution.
    //It will be the result returned from the funtion that is executed last time
    const numberofCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    //object destructuring to pull out only items array from context
    const { items } = cartCtx;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);

        //set the isHighleted false after 300 ms so as to remove bump class,
        //so that it can be added again when item is added to cart.
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        //cleanup function
        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return( 
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>   
            <CartIcon></CartIcon>
       </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberofCartItems}</span>
    </button>
    );
};
export default HeaderCartButton;