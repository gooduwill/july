import bcryptjs from 'bcryptjs';
async function login(password){
    const passwordInDB='$2a$10$gGGZfvdBKMQkQKf3DrwwzODvG4fOs533fXHnylPxtVqVf7mj0BhOi';
    const isValid= await bcryptjs.compare(password, passwordInDB);
    console.log(isValid);
}
login('secret123');