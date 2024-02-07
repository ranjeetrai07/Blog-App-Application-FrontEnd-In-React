import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import { loadAllCategories } from '../services/category-service';
import JoditEditor from 'jodit-react';
import { toast } from "react-toastify";
import { getCurrentUserDetail } from '../auth';
import { createPost as doCreatePost } from '../services/post-service';

const AddPost = () => {

  const editor = useRef(null)
  //const [content, setContent] = useState('')
  const [categories, setCategories] = useState([])
  const [user, steUser] = useState(undefined)

  const [post, setPost] = useState({
    title:'',
    content:'',
    categoryId:''
  })

  useEffect (
    () => {
      steUser(getCurrentUserDetail())
      loadAllCategories().then((data) => {
        console.log(data)
        setCategories(data)
      }).catch(error => {
        console.log(error)
      })
    },[])

  //field changed function
  const fieldChanged=(event) => {
    setPost({...post, [event.target.name]:event.target.value})
  }

  //joedit text editor set function
  const contentFieldChanged = (data) => {
    setPost({ ...post, 'content':data })
  }

  //create post function
  const createPost = (event) =>{
    event.preventDefault();
    console.log("Form Submited")
    console.log(post)

    // console.log(post)
    if (post.title.trim() === '') {
      toast.error("post  title is required !!")
      return;
    }

    if (post.content.trim() === '') {
      toast.error("post content is required !!")
      return;
    }

    if (post.categoryId === '') {
      toast.error("select some category !!")
      return;
    }

    //submit the form on server
    post['userId'] = user.id
    doCreatePost(post).then(data => {

      toast.success("Post Created !!")
      console.log(post)
      setPost({
        title:'',
        content:'',
        categoryId:''
      })
    }).catch((error) => {
      toast.error("Post not create due to some error !!")
      console.log(error)
    })
  }

  return (
    <div className='wrapper'>
        <Card className='shadow-sm mt-4'>
          <CardBody>
            {JSON.stringify(post)}
            <h3>What going in your mind?</h3>
            <Form onSubmit = {createPost}>
              <div className='my-3'>
                <Label for="title">Post title</Label>
                <Input type='text' id='title' placeholder="Enter here" className='rounded-0'
                name='title'
                onChange={fieldChanged}/>
              </div>
              <div className='my-3'>
                <Label >Post Content</Label>
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  onChange = {contentFieldChanged}
                />
              </div>
              <div className='my-3'>
                <Label>Post Category</Label>
                <Input type='select' id='content' placeholder="Enter here" className='rounded-0'
                name='categoryId'
                onChange={fieldChanged}
                defaultValue={0}>
                <option disabled value={0}>----Setect Category-----</option>
                  {
                    categories.map((category) => (
                      
                      <option value={category.categoryId} key={category.categoryId}>
                        {category.categoryTitle}
                      </option>
                    ))
                  }
                
                </Input>
              </div>
              <Container className='text-center'>
                <Button type = 'submit' className='rounded-0' color='primary'>Created Post</Button>
                <Button className='rounded-0 ms-2' color='danger'>Reset Content</Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
    </div>
  );
}

export default AddPost;