import React ,{useEffect}from 'react'
import { useParams ,Link, useHistory} from 'react-router-dom'

import { withRouter } from 'react-router-dom'
import Comments from './Comments'
import DeleteModal from './Modal'
import moment from 'moment'
import { getItemDetail } from '../actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const  Details=()=> {
    const {id}=useParams()
    const history=useHistory()
    const listItem=useSelector(state=>state.itemDetail)
    const loading =useSelector(state=>state.loading)
    const dispatch=useDispatch()
 
    useEffect(() => {
        dispatch(getItemDetail(id))
    }, []);

  

  
   

    if(loading){
        return (
            <div className="ui raised very padded text ">
                <h3>Loading...</h3>
        </div>
        )
    }

    return (
        <React.Fragment>
        <div className="ui raised very padded text position-relative">
            <h2 className="ui header">{listItem.title}</h2>
            <p>{moment(listItem.created_at).format('LLL')}</p>
            <p>{listItem.content}</p>

            <Link to='/' className='all'>All Item</Link>
        </div>
        <div className='d-flex mt-4'>
        <Link className='btn btn-outline-warning mr-3' to={`/posts/${listItem.id}/edit`}>Edit</Link>
        {/* <button className="btn btn-outline-danger mt-4 ml-2" onClick={e=>removeItem(listItem.id)}>Delete</button> */}
        <DeleteModal listItem={listItem} push={history.push}></DeleteModal>
        </div>
       
        

        {/* // CommentsList */}
       <Comments  post_id={id}></Comments>

       {/* setCommentsList={setCommentsList} */}
       {/* sendComments={sendComments}  */}
     </React.Fragment>
     
      
    )
}

export default withRouter(Details);
