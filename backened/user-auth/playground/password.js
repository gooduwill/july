import bcryptjs from 'bcryptjs'
const password='Secret@123'
async function register(){
    try{
        const salt =await bcryptjs.genSalt()
        const hash=await bcryptjs.hash(password,salt)
        console.log(salt,salt.length)
        console.log(hash)
    }catch(err){
        console.log(err)
    }
}
register()