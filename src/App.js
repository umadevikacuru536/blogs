import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [blogsList, setblogsList] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    ftechBlogs()
  })

  const ftechBlogs = async () => {
    const api = "https://apis.ccbp.in/blogs";
    const response = await axios.get(api)
    setblogsList(response.data);
  }

  const onClickBlogDetails = async (blogsId) => {
    const api = `https://apis.ccbp.in/blogs/${blogsId}`
    const response = await axios.get(api);
    setSelectedBlog(response.data)
  }
  console.log(blogsList);
  console.log(selectedBlog);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 ">
          <h1 className='heading'> Blogs List</h1>
        </div>
        <ul className="col-md-4">
          {blogsList.map((blogs) =>
            <div className={`d-flex flex-row mb-2 blogs_container ${selectedBlog && selectedBlog.id === blogs.id ? "selected" : ''}`}
              onClick={((e) => onClickBlogDetails(blogs.id))}>
              <img src={blogs.image_url} alt={blogs.title} className='w-50 image_url' />

              <div className='d-flex flex-column'>
                <p>{blogs.topic}</p>
                <div className='d-flex'>
                  <img src={blogs.avatar_url} alt={blogs.author} className='avatar_url' />
                  <p>{blogs.author}</p>
                </div>
              </div>
            </div>

          )}
        </ul>
        <div className="col-md-8">
          {selectedBlog &&
            <div className='d-flex flex-column'>
              <h3>{selectedBlog.title}</h3>
              <div className='d-flex justify-content-start align-items-center'>
                <img src={selectedBlog.avatar_url} alt="imglogo" className='avatar_url' />
                <p>{selectedBlog.author}</p>

              </div>
              <img src={selectedBlog.image_url} alt={selectedBlog.title} className='w-75 m-1 img' />
              <p>{selectedBlog.content}</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
export default App;