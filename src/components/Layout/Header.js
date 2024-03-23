import React, {Fragment} from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
const Header = props => {
    return (<React.Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
           <HeaderCartButton onClick={props.onShowCart}/>
        </header>

        {/* we cannot use dot notation to access classes.main-image
         because main-image class has a dash in its name. 
         So we need to use array notation instead.*/}
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="a table of food!"></img>
        </div>

    </React.Fragment>
    );
};
export default Header;