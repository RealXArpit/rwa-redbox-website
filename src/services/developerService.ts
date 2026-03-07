import {server} from "../utils/server";

const registerDeveloper =(data) =>{
  return server.post(`developerAdmin/auth/registrationThroughDeveloper`,data)
  .then(res=>{
    return res.data
  })
  .catch(err=>{
    console.log(err)
     return err.response.data;
  })

} 

const developerServices ={
  registerDeveloper
}

export default  developerServices