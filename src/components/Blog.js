import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, name, increaseLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const blogDetail = () => {
    return (
      <div className='blogDetails'>
        <div>{blog.title} {blog.author} <button onClick={toggleVisible}>hide</button></div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={() => increaseLike(blog.id)}>like</button>
        </div>
        <div>{name}</div>
        <button style={{ 'backgroundColor': 'blue' }} onClick={() => deleteBlog(blog.id)}>delete</button>
      </div>
    )
  }

  const blogOverview = () => (
    <div className='blogDiv'>
      {blog.title} {blog.author} <button onClick={toggleVisible}>view</button>
    </div>
  )

  return (
    <div style={blogStyle}>
      {
        visible ? blogDetail() : blogOverview()
      }
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  increaseLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog