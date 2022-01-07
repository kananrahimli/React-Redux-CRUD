import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postComments } from '../actions'

const initial_comments={
    display_name:'',
    body:''
}
export default function WriteComment({edit,currentComment,setEdit,post_id}) {
    const [comments,setComments]=useState(initial_comments)
    // const sending=useSelector(state=>state.loadingComment)
    const loading =useSelector(state=>state.loadingComment)
    const dispatch=useDispatch();
    const handleChange=(event)=>{
        setComments({...comments,[event.target.name]:event.target.value})
    }

    const sendComments=(e,post_id,type,comments,commentID)=>{
       e.preventDefault();
       dispatch(postComments(post_id,type,commentID,comments))
       setComments(initial_comments);
       setTimeout(() => {
        setEdit(false)
       }, 1500);
    }

    useEffect(()=>{
        if(currentComment){
            setComments(currentComment)
        }else{
            setComments(initial_comments)
        }
    },[currentComment])
    return (
        <div>
             <h5 className='text-secondary my-3'>Add comment</h5>
            <div className="ui form" >
            <div className="ui input my-2">
                <input type="text" disabled={edit} placeholder="Name" name='display_name' required value={comments.display_name} onChange={handleChange}/>
            </div>
                <textarea placeholder="Your comment" rows="3" name='body' value={comments.body} required onChange={handleChange}></textarea>
              {!edit &&  <button type='button' className="btn btn-primary mt-2" onClick={e=>{sendComments(e,post_id,'send',comments,null)}}>
                  {loading?'Sending...':'Send Comment'}
                  </button>} 
                  {edit &&  <button type='button' className="btn btn-primary mt-2" onClick={e=>{sendComments(e,post_id,'put',comments,currentComment.id)}}>
                 {loading?'Editing...':'Edit Comment'}</button>} 
            </div>
        </div>
    )
}
