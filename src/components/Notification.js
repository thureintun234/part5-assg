import React from 'react'

const Notification = ({ message, style }) => {
  console.log(message, style);
  const displayStyle = {
    backgroundColor: 'lightgray',
    border: `5px solid ${style}`,
    color: `${style}`,
    height: '20px',
    fontWeight: 'bold',
    padding: '10px'
  }


  return (
    <div style={displayStyle}>
      {message}
    </div>
  )
}

export default Notification