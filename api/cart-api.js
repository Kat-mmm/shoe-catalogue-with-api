// import { randomBytes } from 'crypto';

// export default function CartApi(cartService) {
//     function generateRandomCode(length) {
//         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         const randomBytesBuffer = randomBytes(length);
//         let code = '';

//         for (let i = 0; i < length; i++) {
//             const randomIndex = randomBytesBuffer[i] % characters.length;
//             code += characters.charAt(randomIndex);
//         }

//         return code;
//     }

//     async function createCart(req, res){
//         const randomCode = generateRandomCode(10); // Change 10 to the desired length of your code
//         console.log(randomCode);


//     }

//     return{

//     }
// }