import axios from "axios"


export const getListItem=()=>async dispatch=>{
 await dispatch({type:'SHOW_LOADING'})
  await  axios.get('https://react-yazi-yorum.herokuapp.com/posts')
    .then( res=>{
         
         dispatch({type:'GET_LIST',payload:{data:res.data}})
    })
    
    .catch(()=>{
      dispatch({type:'ERROR_GET_LIST',payload:'Error olsutu'})
    })
}

export const getItemDetail=(id)=> async dispatch=>{
    await dispatch({type:'SHOW_LOADING'})
    await axios.all([
        axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}`),
        axios.get(`https://react-yazi-yorum.herokuapp.com/posts/${id}/comments`)
        ]).then( res=>{
            const payload={
              ...res[0].data,
              comments:res[1].data
            }
            dispatch({type:'GET_ITEM_DETAIL',payload:{data:payload}})
        })
       
        .catch(err=>{
          dispatch({type:'GET_ITEM_DETAIL_ERROR',payload:'HATA OLUSTU'})
            console.log(err);
      })
}

export const postComments= (post_id,type,commentID,comments)=>async dispatch=>{
        await dispatch({type:'SHOW_LOADING_COMMENT'})
        if(type==='send'){
          
         await axios.post(`https://react-yazi-yorum.herokuapp.com/posts/${post_id}/comments`,comments).then(res=>{
            dispatch({type:"SEND_COMMENT",payload:res.data})
          }).catch(err=>{
              console.log(err);
              
          })
      }else if(type==='put'){
         await  axios.put(`https://react-yazi-yorum.herokuapp.com/posts/${post_id}/comments/${commentID}`,comments)
          .then(res=>{
             dispatch({type:"UPDATE_COMMENT", payload:{data:res.data,commentID}})
              
              }).catch(err=>{
                  console.log(err);
                 
              })
      }
}

export const postItem=(id,inputs,props)=>async dispatch=>{
      await dispatch({type:'SHOW_LOADING_COMMENT'})
      if(props.currentListItem){
       await axios.put(`https://react-yazi-yorum.herokuapp.com/posts/${id}`,inputs)
        .then( (res)=>{
            
             dispatch({type:'UPDATE_LIST_ITEM',payload:res.data})
            props.history.push(`/posts/${id}`)
        })
        .catch(err=>{
       
            console.log(err);
        })
    }else{
        await axios.post('https://react-yazi-yorum.herokuapp.com/posts',inputs)
        .then( (res)=>{
         
           dispatch({type:'ADD_LIST_ITEM',payload:res.data})
            props.history.push('/')
        })
        .catch(err=>{
            
            console.log(err);
        })
    }
}

export const remove=(listItem,history,isComment)=>dispatch=>{
      if(isComment){
        axios.delete(`https://react-yazi-yorum.herokuapp.com/posts/${listItem.post_id}/comments/${listItem.id}`)
        .then(()=>{
          dispatch({type:'DELETE_COMMENT',payload:listItem.id})
            // history.push(`/posts/${listItem.post_id}`)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    else{
        axios.delete(`https://react-yazi-yorum.herokuapp.com/posts/${listItem.id}`)
        .then(()=>{
            dispatch({type:'DELETE_ITEM',payload:listItem.id})
            history.push('/')
        })
        .catch(err=>{
            console.log(err);
        })
    }

}