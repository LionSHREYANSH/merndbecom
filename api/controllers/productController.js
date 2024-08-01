const productC = require("../models/products")

// PName : {type : String , required : true} , 
// PDesc : {type : String , required : true} , 
// PAmount : {type : Number , required : true} , 
// PStatus : {type : String , default : "IN-Stock"} , 
// PQty : {type : Number , required : true} , 
// PImg : {type : String , required : true} , 



// const [pname , setPName] = useState("")
// const [pdesc , setDesc] = useState("")
// const [pamount , setPAmount] = useState("")
// const [pqty , setPQty] = useState("")
// const [pstatus , setPStatus] = useState("")
// const [pimg , setPImg] = useState("")
// const [ message , setMessage] = useState("")




exports.admininsertform = (req,res)=>{
    const {pname , pdesc , pamount , pqty , pstatus  } = req.body
    const filename = req.file.filename
    try{
    const record = new productC({PName  : pname ,  PDesc : pdesc,  PAmount : pamount , PQty : pqty ,   PImg : filename , PStatus : pstatus })
      record.save()
        

      res.json({
          status : 201 , 
          apiData : record, 
          message : "you Product is successfully inserted"


        //   if(req.file){
        //     await productC.findByIdAndUpdate( id ,{PName  : pname ,  PDesc : pdesc ,  PAmount : pamount , PQty : pqty ,  PStatus  : pstatus , PImg : filename })
        //     }else{
        //         await productC.findByIdAndUpdate( id, {PName  : pname ,  PDesc : pdesc ,  PAmount : pamount , PQty : pqty ,  PStatus  : pstatus })
           
        //     }
  
      })
  }catch(error){
      res.json({
          status : 400 , 
          message : error.message
      })
  }
  }

exports.adminshowdetails = async(req,res)=>{
    try{
    const record = await productC.find()
    res.json({
        status : 200 , 
        apiData : record , 
        message : "Data .successfully Transfer"

    })
    }catch(error){
        res.json({
            status : 400 , 
            message : error.message
        })
    }
}

exports.adminproductremove = async(req,res)=>{
   const id = req.params.id
   try{
   await productC.findByIdAndDelete(id)
   res.json({
    status:200 , 
    message : "Successfully Remove Data"
   })
}catch(error){
    res.json({
        status : 400 ,
        message : error.message
    })
}
}


exports.singleproductupdate = async(req,res)=>{
    // console.log(req.params.id)
    const id = req.params.id
try{
    const record = await productC.findById(id)
    res.json({
        status : 200 , 
        apiData : record
    })
}
catch(error){
   res.json({
    status : 400 , 
    message : error.message
   })
}
}



exports.adminfinalupdate = async(req,res)=>{
    console.log(req.body)
    const id = req.params.id
    const {pname , pdesc , pamount , pqty , pstatus} = req.body
    // console.log(req.file.filename)
    try{
        await productC.findByIdAndUpdate( id, {PName  : pname ,  PDesc : pdesc ,  PAmount : pamount , PQty : pqty ,  PStatus  : pstatus })
        res.json({
            status : 200 , 
            message : "successfully Product Updated"
        })
    }catch(error){
        res.json({
            status : 400 , 
            message: error.message
        })
    }
       
    
  
}


exports.adminfinalupdateImage = async(req,res)=>{
    const id = req.params.id
    const {pname , pdesc , pamount , pqty , pstatus} = req.body
     const filename = req.file.filename
    // console.log(req.file.filename)
    try{
        if(req.file){
        await productC.findByIdAndUpdate( id ,{PName  : pname ,  PDesc : pdesc ,  PAmount : pamount , PQty : pqty ,  PStatus  : pstatus , PImg : filename })
        }else{
            await productC.findByIdAndUpdate( id, {PName  : pname ,  PDesc : pdesc ,  PAmount : pamount , PQty : pqty ,  PStatus  : pstatus })
       
        }
        res.json({
            status : 200 , 
            message : "successfully Product Updated"
        })
    }catch(error){
        res.json({
            status : 400 , 
            message: error.message
        })
    }
       
    
  
}


exports.usershowProduct =async (req,res)=>{
    try{
    const record =  await productC.find({PStatus :"IN-STOCK"})
    res.json({
        status : 200 , 
        apiData : record , 
        message : "Represent successfully"
    })
    }catch(error){
            res.json({
                status : 400 , 
                message : error.message
            })
    }
}




