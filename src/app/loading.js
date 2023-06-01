import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'><Image width={100} height={100} src="/blockGIF.gif" alt="Loading..." /> </div>
  )
}

export default Loading