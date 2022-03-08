import axios from 'axios';
import {useState, useEffect} from 'react';
import SingleComment from './SingleComment'

const Comments = (props) => {

    const [comment, setComment] = useState("")
    const [user, setUser] = useState("")
    const [postComment, setPostComment] = useState(0)

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
            // id: postComment._id
        }).then(() => {
            axios.get('http://localhost:3000/comments').then((res) => {
            setPostComment(res.data)
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
            
           {props.commentList.map((comment, index) => {
               return(
                <div>
                    <p> From: {props.commentList[index].user}</p>
                    <p>{props.commentList[index].comment}</p>
                </div>
               )         
           })}
           <hr></hr>
           <h4>Add a comment</h4>
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
                placeholder="Comment..."
                value={comment.comment}
                onChange={handleCommentChange}
                /><br/>
                <input type="submit" value="Submit Comment" onClick={handleCommentPost}/>
            </form>
        </>
    )}

export default Comments;