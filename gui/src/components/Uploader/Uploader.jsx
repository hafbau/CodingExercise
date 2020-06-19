import React from 'react'
import 'react-dropzone-uploader/dist/styles.css';
import './uploader.css'
import { Dropzone } from '../_external'

// specify upload params and url for your files
const getUploadParams = () => { 
  return { url: `${process.env.REACT_APP_API_URL}/path/compute` }
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
      <h2 className='title'>Upload Turtle travel files here</h2>
      <em className='subtitle'>You would also see a history of files you've uploaded previously.</em>
      <Dropzone
        addClassNames={{
          dropzone: 'dropzone',
          inputLabelWithFiles: 'add-button'
        }}
        SubmitButtonComponent={null}
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept='.txt'
      />
    </section>
  )
}
