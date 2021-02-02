import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios';
import ServerSettings from '../ServerSettings.js'

function Dropzone(props) {

    const onDrop = useCallback(acceptedFiles => {


        let file = acceptedFiles[0]
        let url = file && URL.createObjectURL(file)

        props.getPictureFromDropzone(url)
   
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
            }
        };

        let fd = new FormData();

        acceptedFiles.map((file) => {
            fd.append('Test', file);
        });

        fd.append("customName", "böö" + file.name)

        axios.post(ServerSettings.baseURL + "/authenticated" + "/upload", fd, config)

    }, [])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div style={{ border: '2px solid black', width: 500, paddingLeft: 5, paddingRight: 5 }} {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default Dropzone