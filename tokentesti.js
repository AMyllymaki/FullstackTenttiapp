var jwt = require('jsonwebtoken');
var token = jwt.sign({foo: 'dsss'}, '12323');


const f= async()=>
{
    try{
        let hast = await bcrypt.hash("kissa,", 5)
        console.log(hast)
    }
    catch
    {
    
    }
}

f()

console.log(jwt.decode(token))
console.log(jwt.verify(token, '12323'))

console.log(token)