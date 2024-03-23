import classes from "./Input.module.css";
import React from 'react';
const Input = React.forwardRef((props ,ref) => {
    return(
    <div className={classes.input}>
        <label htmlFor={props.inputProp.id}>{props.label}</label>
        <input ref={ref} {...props.inputProp}/>
    </div>
    );
});

export default Input;