const INITIAL_STATE={
    lists:[],
    itemDetail:{
        id:null,title:null,content:null,created_at:null,
        comments:[]
    },
    error:null,
    loading:true,
    loadingComment:false
}

export  const reducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'SHOW_LOADING':
            return {...state,loading:true}
        case 'SHOW_LOADING_COMMENT':
            return {...state,loadingComment:true}
        case 'GET_LIST':
            return{ ...state,lists:action.payload.data,loading:false}
        case 'GET_LIST_ERROR':
            return {...state,error:action.payload}
        case 'ADD_LIST_ITEM':
            return {...state,loadingComment:false}
        case 'UPDATE_LIST_ITEM':
            return {...state,loadingComment:false}
        case 'GET_ITEM_DETAIL':
            return {...state,itemDetail:action.payload.data,loading:false}
        case 'GET_ITEM_DETAIL_ERROR':
            return {...state,error:action.payload}
        case 'SEND_COMMENT':
            return {...state,loadingComment:false,itemDetail:{...state.itemDetail,comments:[...state.itemDetail.comments,action.payload]}}
        case 'UPDATE_COMMENT':
            return {...state,loadingComment:false,itemDetail:{...state.itemDetail,comments:state.itemDetail.comments.map(item=>{
                if(action.payload.commentID===item.id){
                    return action.payload.data
                }else{
                   return item
                }
            })}}    
        case 'DELETE_ITEM':
            return{...state,lists:state.lists.filter(item=>item.id!==action.payload)}
        case 'DELETE_COMMENT':
            return{...state,itemDetail:{...state.itemDetail,comments:state.itemDetail.comments.filter(comment=>comment.id!==action.payload)}}
        default:
            
    }
    return state
}