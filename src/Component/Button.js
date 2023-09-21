import React from 'react';

const Button = ({ props }) => {
    const [count, setCount] = React.useState(0);
    function handleClick() {
        setCount(count + 1);
    }
    function handleClickMin() {
        setCount(count - 1);
    }
    return (
        <React.Fragment>
            <h1>{count} {props}</h1>
            <button onClick={handleClick} className='btn btn-primary'>Click plus !</button>
            <button onClick={handleClickMin} className='btn btn-danger'>Click min !</button>
        </React.Fragment>



    )
}


export default Button