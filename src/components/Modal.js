import React, { useState } from 'react'
import {Modal,Button} from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { remove } from '../actions'
import { useHistory } from 'react-router-dom'
export default function DeleteModal({listItem,isComment}) {
    const [open,setOpen]=useState(false)
    const history=useHistory()
    const dispatch =useDispatch()
    const show=()=>{
        setOpen(true)
    }
    const close=()=>{
        setOpen(false)
    }


    const deleteItem=()=>{
         dispatch(remove(listItem,history,isComment))
    }
    return (
        <>
           {!isComment && <Button onClick={show} negative >
                Delete  
            </Button>
             }
          {isComment &&  <span onClick={show} className='text-danger ml-3'>
                Delete  
            </span>
             }
            <Modal
               className='modal'
                size='mini'
                dimmer='blurring'
                open={open}
                onClick={close}
            >
                <Modal.Header>Delete This Post</Modal.Header>
                <Modal.Content>
                <p>Are you sure you want to delete <span style={{textDecoration:'underline'}}><b >{listItem.title}</b></span></p>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={close}>
                    No
                </Button>
                <Button 
                positive
                labelPosition='right'
                content='Yes,delete'
                icon='delete'
                 
                onClick={()=>deleteItem()}>
                  
                </Button>
                </Modal.Actions>
          </Modal>
          </>
    )
}
