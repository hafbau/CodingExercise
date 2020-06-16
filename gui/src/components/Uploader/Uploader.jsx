import React from 'react'
import './uploader.css'
import { Dropzone } from '../_external'

// specify upload params and url for your files
const getUploadParams = () => { 
  return { url: '/api/v1/path/compute' }
}
  
// receives array of files that are done uploading when submit button is clicked
const handleSubmit = (_, allFiles) => {
  allFiles.forEach(f => f.remove())
}

export const Uploader = ({ onUploadResponse }) => {
  // called every time a file's `status` changes
  const handleChangeStatus = ({ xhr }, status) => { 
    if (status == 'done' && xhr.response && onUploadResponse) {
      onUploadResponse(JSON.parse(xhr.response));
    }
  }

  return (
    <section className='uploader'>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept='.txt'
      />
    </section>
  )
}
