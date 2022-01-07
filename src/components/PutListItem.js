import React, { useEffect } from 'react'
import Form from './Form'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

export default function PutListItem() {
    const {id}=useParams()
    const [currentListItem,setCurrentListItem]=useState(null)
    useEffect(()=>{
        axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`)
        .then(res=>setCurrentListItem({title:res.data.title,content:res.data.content}))
        .catch(err=>console.log(err))

        
    },[])
    return (
        <div className='position-relative'>
            <h3>Edit Item</h3>
            <Form edit={true} currentListItem={currentListItem}></Form>
        </div>
    )
}
