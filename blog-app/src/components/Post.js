import React from 'react';
import { Card, CardBody, CardText, Button } from 'reactstrap';

function Post({post = {title: "This is default post title", content: "This is default post content" }}) {
    console.log(post)
  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
            <h1>{post.title}</h1>
            <CardText>
               {post.content.substring(0,60)}...
            </CardText>
            <div>
                <Button>Read More</Button>
            </div>
        </CardBody>
    </Card>
  );
}

export default Post;
