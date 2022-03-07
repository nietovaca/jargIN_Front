import axios from 'axios';
import {useState} from 'react';

// How can I successfully use props here?
const Comments = () => {

    const [comment, setComment] = useState("")
    const [user, setUser] = useState("")

    const handleCommentChange = (event) => {
        setComment(event.currentTarget.value)
    }

    const handleUserChange = (event) => {
        setUser(event.currentTarget.value)
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/comments', {
            user: user,
            comment: comment
        }).then(() => {
            axios.get('http://localhost:3000/comments').then((res) => {
            setComment(res.data)
            })
        })
        console.log(comment);
    }
        
    return (
        <>  
            <h3>Comments</h3>
            <form onSubmit={handleCommentSubmit}>
                <input
                type="text"
                name="user"
                placeholder="Name"
                value={user}
                onChange={handleUserChange}
                /><br/>
                <br/>
                <textarea
                type="text"
                name="comment"
                placeholder="Add a comment..."
                value={comment}
                onChange={handleCommentChange}
                /><br/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )}

export default Comments;