import bcryptjs from 'bcryptjs'

async function login() {
    const password = 'Secret@123'
    const hashed = '$2a$10$vKicLl/Wf/woad/xNlEzOenTdT.lcNho66lEQIwaQk19Ro8mkBFVC'
    // const extractSalt = bcryptjs.getSalt(hashed)
    // const newHash = await bcryptjs.hash(password, extractSalt)
    // console.log(hashed == newHash)
    const isVerified = await bcryptjs.compare(password, hashed)
    console.log(isVerified)
}   

login()