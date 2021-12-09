const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

//1.
it("POST /api/products", async() => {
    const response = await request(app)
        .post("/api/products") // 해당 경로에 요청이 들어옴
        .send(newProduct); // 새 상품 데이터 넣기

        expect(response.statusCode).toBe(201)  //서버확인
        expect(response.body.name).toBe(newProduct.name) //상품이름 확인
        expect(response.body.description).toBe(newProduct.description)
})

//2
it("should return 500 on POST /api/products", async() =>{
    const response = await request(app).post("/api/products").send({ name: "phone" }); //이름데이터만 보내기 (에러 발생)
    
  //  console.log('resbody',response.body);
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({ message : "Product validation failed: description: Path `description` is required." })
})