import request from '../utils/request'

request.get('http://localhost:8181/data.json').then(res =>{
    console.log(res.data );
}).catch(err=>{
    console.log(err);
})