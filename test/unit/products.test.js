// describe("calculation", ()=>{  
//     test('two plus two is four', () =>{
//         expect(2+2).toBe(4);
//     })   
//     it('two plus two is not five', ()=>{
//         expect(2+2).not.toBe(5); 
//     })
// })

const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProduct = require('../data/all-product.json');

//2-1. mock함수 (모의, 가짜함수)
productModel.create = jest.fn();
productModel.find = jest.fn();

//4. 공통된 코드 beforeEach 사용하기 (변수는 바깥으로 빼 주기) //3번 주석
let req,res, next;
beforeEach(() =>{
    req= httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})
describe("Product Controller Create", ()=>{
    //4-1. 생성 시 데이터 가져오기 before (3-1번 가져오기)
    beforeEach(()=>{
        req.body = newProduct;
    })
    //1. 해당 메소드가 function인지 테스트 -> 해당 메소드 생성하기
    it("should have a createProducte function", ()=>{
        expect(typeof productController.createProduct).toBe("function");
    })

    it("should call ProductModel.create", async () =>{

                //3. node-mocks-http 가져오기 (request.body 쓰기 위해) -> controller req,res,next 추가
                    // let req= httpMocks.createRequest();
                    // let res = httpMocks.createResponse();
                    // let next = null;
                //3-1. data파일의 new.json에 데이터 직접 넣어주기 -> 가져와서 넣기
                    // req.body = newProduct;
        
        //2. 컨트롤러의 create메소드가 호출될때 모델이 생성 되는지
            //2-1 단, 직접적 영향을 받으면 안되므로 mock(모의)함수 이용 -> controller에서 모델 사용
        await productController.createProduct(req,res,next);
        expect(productModel.create).toBeCalledWith(newProduct);
    })

    //5. 상태값 보내기
    it("shold return 201 response code", async ()=>{
        await productController.createProduct(req,res,next);
        expect(res.statusCode).toBe(201);
        //5-1. controller에서 인위적으로 201돌려주는 것으로 바꾸기
        
        //5-2. 값이 잘 전송되었는지 확인 (_isEndCalled)
        expect(res._isEndCalled()).toBeTruthy(); //true를 받았는지 체크
    })

    //6. 결과값 확인
    it("should return json body in response", async ()=>{
        // mockReturnValue : 어떤 결과값을 반환할지 직접 지정 
        productModel.create.mockReturnValue(newProduct); //create는 이미 잘 작동 될거라는 가정 하(mock이기 때문에)
        await productController.createProduct(req,res,next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        //6-1. controller에 createdProduct 정의
    })
    //7. async await 넣어주기 (await은 controller 호출한 부분에)

    //8. mock 함수로 에러메세지 생성 (필수파라미터를 생략했을 때)
    it("should handle errors", async()=>{
        const errorMessage = { message: "description property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.create.mockReturnValue(rejectedPromise); //만든 에러메세지 리턴

        //8-1. 컨트롤러 호출 / next에 mock함수 넣어주기
        await productController.createProduct(req,res,next);
        expect(next).toBeCalledWith(errorMessage);

        //8-2. 컨트롤러에 실패 시 코드 작성해주기
    })
})


//Read
describe("Product Controller Get",()=>{
    it("should have a getProducts function", () =>{
        expect(typeof productController.getProducts).toBe("function");
    })

    it("should call ProductModel.find({})", async ()=>{ // find({}) = 모든값을 조건 없이 가져오겠다
        await productController.getProducts(req,res,next);
        expect(productModel.find).toHaveBeenCalledWith({}); // 빈 값과함께 호출 되는지
    })

    it("should return 200 response", async() =>{
        await productController.getProducts(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    })

    it("should return json body in response", async() =>{
        productModel.find.mockReturnValue(allProduct); //임의 결과값(모의) -> all product.json 생성
        await productController.getProducts(req,res,next);
        expect(res._getJSONData()).toStrictEqual(allProduct);
    })

    it("should handle errors", async() =>{
        const errorMessage = { message : "Error finding product data"} //에러 메세지 생성
        const rejectedPromise = Promise.reject(errorMessage); //만든 에러메세지 promise에 담기
        productModel.find.mockReturnValue(rejectedPromise); //리턴 값 지정

        await productController.getProducts(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })

})