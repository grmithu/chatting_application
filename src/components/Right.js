import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment/moment';

const Right = (props) => {
  return (
    <div className='right'>
      <h3>Account Info</h3>
      <ListGroup>
        <ListGroup.Item>{moment(props.createtime).fromNow()}</ListGroup.Item> 
      </ListGroup>
    </div>
  )
}

export default Right
