import React from 'react';

function DisplayResult(props){
    return(
        <div>
            <table><tr>
                <td><img src={props.image}/></td>
                <td>{props.name}</td>
                <td>{props.date}</td>
                <td>{props.id}</td>
                <td>{props.description}</td>
            </tr></table>
        </div>
    )
}

export default DisplayResult;
