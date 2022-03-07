import axios from 'axios';
import {useState} from 'react';
import SingleComment from './SingleComment'

const Comments = (props) => {

    const [comment, setComment] = useState("")
    const [user, setUser] = useState("")
    const [postComment, setPostComment] = useState([])

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const handleUserChange = (event) => {
        setUser(event.target.value)
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/comments', {
            user: user,
            comment: comment,
            id: props.id
        }).then(() => {
            axios.get('http://localhost:3000/comments').then((res) => {
            setComment(res.data)
            // props.refreshFunction(res.data)
            })
        })
        console.log(comment);
    }

    const handleCommentPost = (index) => {
        handleCommentSubmit(index)
        setPostComment(index)
    }
        
    return (
        <>  
            <h3>Comments</h3>
            
           {props.commentList && props.commentList.map((comment, index) => {
                <>
                    <SingleComment comment={comment} id={props.id}/>
                </>           
           })}
            <form onSubmit={handleCommentPost}>
                <input
                type="text"
                name="user"
                placeholder="Name"
                value={user.user}
                onChange={handleUserChange}
                /><br/>
                <br/>
                <textarea
                type="text"
                name="comment"
                placeholder="Add a comment..."
                value={comment.comment}
                onChange={handleCommentChange}
                /><br/>
                <input type="submit" value="Submit" onClick={handleCommentPost}/>
            </form>
        </>
    )}

export default Comments;