const {mockRequest,mockResponse} = require('../../tests/mocker');
const jestMock = require('jest-mock');
const categoryModel = require('../../models/category.model'); 
const categoryController = require('../../controllers/categoryController');

const testPayload =[ 
    {
        categoryId:1,
        name:'mobile'
    },
    {
        categoryId:2,
        name:'tv'
    },
    {
        categoryId:3,
        name:'electronics'
    }
];
it(" category controller should return error on all categories",async()=>{
    const spy = jestMock.spyOn(categoryModel,'listCategories').mockImplementation((cb)=>{
        cb(new  Error("This is a new error!"),null)
    });
    const req = mockRequest();
    const res = mockResponse();
    await categoryController.listCategories(req,res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    // expect(res.send).toHaveBeenCalledWith({
    //     message:"error in fetching categories!",
    //     success:false
    // });
});
it(" category controller should return all categories",async()=>{
    const spy = jestMock.spyOn(categoryModel,'listCategories').mockImplementation((cb)=>{
        cb(null,testPayload)
    });
    const req = mockRequest();
    const res = mockResponse();
    await categoryController.listCategories(req,res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.send).toHaveBeenCalledWith({
    //     message:"Successfully fetch all category!",
    //     success:true,
    //     categories:testPayload
    // });
})