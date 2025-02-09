const http=require('http')
const port=3000
const employees = [
    { "id": 1, "name": "John Doe", "position": "Software Engineer" },
    { "id": 2, "name": "Jane Smith", "position": "Product Manager" },
    { "id": 3, "name": "Mike Johnson", "position": "UX Designer" }
  ]
  
  const server=http.createServer(function(request,response){
 if(request.url='/clients'){
    response.end(JSON.stringify(employees))
 }
 else{
    response.end('404 not found')
 }

  })
  server.listen(port,function(){
    console.log('server is running on port'+port)
  })