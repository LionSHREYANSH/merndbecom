const router = require("express").Router()
 const Regc = require("../controllers/regController")
 const Proc = require("../controllers/productController")
 const multer = require("multer")

 const Storage = multer.diskStorage({
 destination :(req , file , cb)=>{
 cb(null, "./public/upload"); 
 },
 
 filename : function(req,file,cb){
 cb(null , Date.now()+file.originalname);
 
 }
 })
 
 
 let upload = multer({
 
 storage :Storage , 
 limits :{
 filesize : 1024*1024*4
 
 }
 
 })





router.post("/Register",Regc.Register)
router.post("/Login" , Regc.Login)

router.post("/adminproductinsertform" ,upload.single("pimg") , Proc.admininsertform)
router.get("/adminshowdetails",Proc.adminshowdetails)
router.delete("/admindeleteproduct/:id",Proc.adminproductremove)
router.get("/singleproductupdate/:id" , Proc.singleproductupdate )
router.put("/adminupdate/:id",Proc.adminfinalupdate)
router.put("/adminupdateImage/:id",upload.single("pimg"),Proc.adminfinalupdateImage)
router.get("/usershowlist" ,Proc.usershowProduct )














module.exports = router