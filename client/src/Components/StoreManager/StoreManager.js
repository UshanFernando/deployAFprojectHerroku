import React from 'react'

const StoreManager = (props) =>{
    return (

        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td><button className="btn btn-danger btn-sm" onClick={props.onDelete}>
                <i className="fa fa-trash" aria-hidden="true"></i>
                <span> Remove</span>
            </button></td>
        </tr>

    )
}

export default StoreManager
