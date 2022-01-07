
import React, { useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getListItem } from '../actions'
import { useDispatch } from 'react-redux'
export default function ListItem() {
   
    const lists=useSelector(state=>state.lists)
    const loading=useSelector(state=>state.loading)
    const dispatch=useDispatch()
    const getLists=()=>{
        dispatch(getListItem()) 
    }
    useEffect(()=>{
        getLists()
    },[])
    return (
     <div className="ui relaxed divided list clearfix">
         {loading && lists.length<1 && <h3>LOADING...</h3>}
         {lists.map(list=>{
             return <div className="item" key={list.id}>
                <i className="large github middle aligned icon"></i>
                <div className="content">
                <Link to={`/posts/${list.id}`} className="header">{list.title}</Link>
                <div className="description">{moment(list.created_at).format('LLL')}</div>
                </div>
           </div>
         })}

       {(!loading || lists.length>0) && <Link className='btn btn-outline-info mt-5 float-right ' to='/add-item'>Add Item </Link>}  
          
      </div>
       
    )
}
