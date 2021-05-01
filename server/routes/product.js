const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require('multer');

const { auth } = require("../middleware/auth");
const { default: UploadProductPage } = require('../../client/src/components/views/UploadProductPage/UploadProductPage');

var storage = multer.diskStorage({ // 받는 파일과 관련된 설정 (저장경로, 파일명, 받는파일형식)
    destination: (req, file, cb) => {
        cb(null, 'uploads /')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})


var upload = multer({storage: storage}).single("file");

//=================================
//             Product
//=================================

router.post("/uploadImage", auth, (req, res) => {
    //client한테 사진 받으면
    //node server에 저장해야함
    //Multer library 사용해야함 npm install multer --save
    upload(req,res,err => { //front end 쪽으로 어떤식으로 저장됐는지 보여주려고 --> utils/FileUpload
        if(err) return res.json({success: false, err})
        return res.json({success: true, image: res.req.file.path, fileName: res.req.file.filename}) //success: true!
    })

});

router.post("/uploadProduct", auth, (req, res) => {
    const product = new Product(req.body)
    product.save((err)=> {
        if(err) return res.status(400).json({success: false,err})
        return res.status(200).json({success: true})
    })
});



module.exports = router;
