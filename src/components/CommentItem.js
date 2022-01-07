import React, { useEffect, useState } from 'react'
import user from './user.png'
import WriteComment from './WriteComment'

import moment from 'moment'
import DeleteModal from './Modal'
import { withRouter,useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
const CommentItem=({post_id}) =>{
    const [currentComment,setCurrentComment]=useState({display_name:'',body:'',id:null})
    const [edit,setEdit]=useState(false)
    const history=useHistory()
    const commentsList=useSelector(state=>state.itemDetail.comments)

    const handleEdit=(id)=>{
        const currentComment=commentsList.find(comment=>comment.id===id)
        setCurrentComment({display_name:currentComment.display_name,body:currentComment.body,id:currentComment.id})
        setEdit(true)
    }
    return (
        <div>
            <h5 className='text-muted mt-5'>Yorumlar</h5>
            { commentsList.length>0 && commentsList.map(comment=>{
                return <div className="ui relaxed list d-flex justify-content-between" key={comment.id}>
                        <div className="item position-relative d-flex align-items-center">
                            <img className="ui avatar image" src={user}/>
                            <div className="content ">
                                <a className="header mb-2">{comment.display_name}</a>
                                <div className="description">{comment.body} &nbsp;&nbsp;<a className='text-muted' 
                                style={{fontSize:'12px'}}>{ moment(comment.created_at).startOf('day').fromNow() }</a>
                                </div>
                            </div>
                           
                        </div>
                        <div className="actions align-self-center d-flex ">
                                    <span className='text-warning' onClick={e=>handleEdit(comment.id)}>Edit</span>
                                    <DeleteModal isComment={true}  listItem={comment} ></DeleteModal>
                         </div>
                    </div>
             })}
             <WriteComment post_id={post_id}  edit={edit} currentComment={currentComment}  setEdit={setEdit} ></WriteComment>
        </div>
    )
}

export default withRouter(CommentItem)
