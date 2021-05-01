const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User' //Id 받은걸로 User schema의 정보 다 갖고 옴
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array, // 여러장 갖고올거니까
        default: []
    },
    continents: {
        type: Number, // key를 넣을 예정이니까
        default: 1
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
    // 언제 올렸는지 찍어줘야지
}, {timestamps: true})



const User = mongoose.model('Product', productSchema);

module.exports = { User }