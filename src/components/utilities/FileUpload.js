import React ,{useState }from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'

function FileUpload(props) {

    const [Images, setImages] = useState([])    
    const onDrop = files => {
        let formdata = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formdata.append("file", files[0])

        axios.post('http://localhost:5000/product/upload', formdata, config)
            .then(response => {
                if (response.data.success) {
                    //do something
                    setImages([...Images,response.data.image])
                    console.log([...Images, response.data.image]);
                    props.refreshfunction([...Images, response.data.image])
                }
                else {
                    alert('Failed to save image');
                }
            })
    }

   
    return (
        <div>
           
            <Dropzone onDrop={onDrop } multiple={false} maxSize = {8000000000} >
                {({ getRootProps, getInputProps }) => (     
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
              Click me to upload a file!    
                    </div>
                )}
            </Dropzone> 
           <div style = {{display : 'flex' , width : '350px',height: '240px',overflowX : 'scroll'}} >
               
                {Images.map((image, index) => (
                    <div onClick >
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/uploads/${image}`}  alt={`productImg-${index}`} />
                    </div>
                ))}

           </div>


        </div>
    )
}

export default FileUpload