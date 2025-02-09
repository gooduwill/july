function Book(title,Author,year,genre){

this.title=title
this.Author=Author
this.year=year
this.genre=genre

}
Book.prototype.getSummary=function(){
    return `${this.title} by ${this.Author}, published in ${this.year} (${this.genre})`
}
Book.prototype.getAge=function(){
    const currentYear=new Date().getFullYear()
    return currentYear-this.year
}
Book.prototype.isClassic=function(){
    //if(this.getAge()>50)
    //{return true}
    //else{
       // return false
    const currentYear=new Date().getFullYear()
     if(currentYear-this.year>50){
        return true
     }
     else{
        return false
     }
    }

const b1=new Book('harry potter','jkrowling',2002,'fiction')
console.log(b1)
console.log(b1.getSummary())
console.log(b1.getAge())
console.log(b1.isClassic())