import React, { useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postItem } from '../actions'
const initial_inputs={
    title:'',
    content:''
}
 const AddListItem=(props)=>{
    const sending=useSelector(state=>state.loadingComment)
    const [inputs,setInputs]=useState(initial_inputs)
    const dispatch=useDispatch()
    const {id}=useParams()
    useEffect(()=>{
        if(props.currentListItem){
            setInputs(props.currentListItem)
        }else{
            setInputs(initial_inputs)
        }
    },[props.currentListItem])
    const handleChange=(event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }

    const handleSubmit=(event)=>{
      
        event.preventDefault();
        dispatch(postItem(id,inputs,props))
    }
    return (
        <div className=''>
             <Link to='/' className='all'>All Item</Link>
            <form className="ui form " onSubmit={handleSubmit}>
               
                <div className="ui input my-2 w-100">
                    <input type="text" placeholder="Title" required className='w-100' name='title'onChange={handleChange} value={inputs.title}/>
                </div>
                <textarea placeholder="Content" required rows="3" name='body' name='content'onChange={handleChange} value={inputs.content}></textarea>
                {!props.edit  &&  <button type='submit'  className="btn btn-primary mt-3">{sending?'Sending...':'Send Comment'}</button>}
               {props.edit  && <button type='submit'  className="btn btn-primary mt-3">{sending?'Editing...':'Edit'}</button>} 
                <Link  className="btn btn-secondary mt-3 ml-3" to={props.edit?`/posts/${id}`:'/'}>{'Cancel'}</Link>
            </form>
        </div>
    )
}

export default withRouter(AddListItem);
