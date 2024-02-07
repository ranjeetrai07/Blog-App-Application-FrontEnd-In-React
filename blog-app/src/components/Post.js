import React from 'react';
import { Card, CardBody, CardText, Button } from 'reactstrap';

function Post({posts}) {
    console.log(posts)
  return (
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
            <h1>this is post</h1>
            <CardText>
               
            </CardText>
            <div>
                <Button>Read More</Button>
            </div>
        </CardBody>
    </Card>
  );
}

export default Post;
