import React, { useEffect, useState } from 'react';
import { loadAllPosts } from '../services/post-service';
import { Col, Row } from 'reactstrap';
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroll-component';

function NewFeed() {

    const [postContent, setPostContent]=useState(null)

   useEffect( () => {
    //load all the post from server 
    loadAllPosts().then((data) => {
        console.log(data);
        setPostContent(data)
    }).catch(error => {
        console.log(error)
    })
   },[]) 

   console.log(postContent)
   
  return (
    <div className="container-fluid">
      <Row>
        <Col md={
            {
                size:10,
                offset:1
            }
        }>

        <h1>Blogs Count ( {postContent?.totalElements} )</h1>
        {/* {
            postContent?.content.map((post) => {
                
            })
        } */}
 
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
