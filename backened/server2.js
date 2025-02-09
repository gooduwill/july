const http=require('http')
const port=3050
const students = [
    { id:1, name:'jhon',course:'front-end'},
    { id:1, name:'smith', course:'fullstack'}

  ]

  const server=http.createServer(function(request,response){
if(request.url=='/list-students'){
  response.end(JSON.stringify(students))
 }
 else if(request.ulr=='/get-names'){
    const studentNames=[]
    students.forEach(function(stud){
  studentNames.push(stud.name)
    })
    response.end(JSON.stringify(studentNames))
 }
 else if(request.url=='/enrolled-fullstack'){
    const enrollment=students.filter(function(stud){
    return stud.course=='fullstack'
    })
    response.end(JSON.stringify(enrollment))
 }
 else{
    response.end('page not found')
 }

  })
  server.listen(port,function(){
    console.log('server is running on port'+port)
  })