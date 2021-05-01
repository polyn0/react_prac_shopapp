import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import Axios from 'axios';
import {Icon} from 'antd'

function FileUpload(props) {

    const [Images, setImages] = useState([]); // 배열 선언..사진 여러장 갖고와도 되니까 
    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        // requst하면, server/index로 감. 그곳에서 route/product로 연결해줌.
        Axios.post('/api/product/uploadImage', formData, config) //http request (웹에서 컴퓨터 접근)
            .then(response => {
                if (response.data.success) { //success : true!

                    setImages([...Images, response.data.image]) //이전 이미지, 새로운 이미지
                    props.refreshFunction([...Images, response.data.image])
                    // 이미지 정보를 parent component(UploadProductPage )에 update해야함. 
                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }

    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images]
        newImages.splice(currentIndex,1) //newImages 중 index로부터 1개 삭제
        //target image 삭제
        
        //UploadPage에 update해줘야지
        setImages(newImages)
        props.refreshFunction(newImages)
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })}
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>
            
            {/* images 는 array니까 map */}
            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>               
                {Images.map((image, index) => ( 
                    <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} 
                            src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))} 
            </div>

        </div>
    )
}

export default FileUpload
