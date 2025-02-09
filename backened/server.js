const http=require('http')
const port=3009
const employees = [
    { "id": 1, "name": "John Doe", "position": "Software Engineer" },
    { "id": 2, "name": "Jane Smith", "position": "Product Manager" },
    { "id": 3, "name": "Mike Johnson", "position": "UX Designer" }
  ]
const clients=[
   {id:1, name:'apple'},
   {id:2, name:'orange'},
   {id:3, name:'mango'}
]
  const server=http.createServer(function(request,response){
if(request.url=='/employees'){
  response.end(JSON.stringify(employees))
 }
 else if(request.url=='/clients')
   {
   response.end(JSON.stringify(clients))
 }
 else{
    response.end('404 not found')
 }

  })
  server.listen(port,function(){
    console.log('server is running on port'+port)
  })