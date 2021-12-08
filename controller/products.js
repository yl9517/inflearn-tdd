// exports.hello = (req,res)=>{ // /api/products
//     res.send("안녕하세요");
// };

const productModel = require("../models/Product");

exports.createProduct = async (req, res, next) => {
    //2-2. 모델 생성 //6-2. createdProduct정의 후 (json)반환 

    //8-2. 실패 시 에러코드 작성 try-catch
    try{
        const createdProduct = await productModel.create(req.body);
        console.log('createdProduct',createdProduct);
        res.status(201).json(createdProduct);
    }catch(error){
        next(error)
    }
};
// 7. 동기를 위해 async, await 넣기 -> test코드에도 마찬가지