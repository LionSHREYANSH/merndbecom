const Reg = require("../models/register")
const bcrypt = require("bcrypt")




exports.Register = async(req, res) => {
    const { Username, Password, Email } = req.body
    const checkpass = await bcrypt.hash(Password  , 10)
    const usercheck = await Reg.findOne({Username : Username})
    
  try{
    if(usercheck == null){
    const record =  new Reg({ Username: Username, Password: checkpass, Email: Email })
    record.save()
    res.json({
        status : 201 , 
        apiData : record , 
        message : "successfully Register"
        
    })
}else{
    res.json({
        status : 401 , 
        message : "username is already taken"
    })
}
    
  }catch(error){
        res.json({
            status : 400 , 
            message : error.message
        })
  }
   

}

exports.Login = async(req,res)=>{
    const {Username , Password} = req.body
    const record = await Reg.findOne({Username : Username})
    try{
   if(record !== null){
        const userpasscheck = await bcrypt.compare( Password ,  record.Password )
            if(userpasscheck){

            
    res.json({
        status : 200 , 
        apiData : record.Username , 
        message  : `${Username} successfully login`
    })
}else{
    res.json({
        status : 400 , 
        message : 'oops somthing went wrong..'

   })
}
   }else{
    res.json({
        status : 400 , 
        message : 'oops somthing went wrong..'

   })
   }
}catch(error){
    res.json({
        status : 401 , 
        message : "wrong credientials"
    })
}
}