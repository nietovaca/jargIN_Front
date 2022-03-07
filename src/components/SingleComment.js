import React from 'react'

const SingleComment = (props) => {
    return (
        <div>
            <h3>Single Comment</h3>
            <p>{props.comment}</p>
        </div>
    )
}

export default SingleComment