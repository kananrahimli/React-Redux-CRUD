import React from 'react'
import CommentItem from './CommentItem'


export default function Comments({post_id}) {
    return (
        <div>
             <CommentItem  post_id={post_id} ></CommentItem>
        </div>
    )
}
