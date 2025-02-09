const express=require('express')
const mongoose=require('mongoose')//npm install mong
const{checkSchema,validationResult}=require('express-validator')
const port=3054
const app=express()
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/expense-app-july24')
.then(()=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('error connecting to db',err)
})
const{Schema,model}=mongoose
const categorySchema=new Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

const Category=model('Category',categorySchema)
const categoryValidationSchema={
    name:{
        in:['body'],
        exists:{
            errorMessage:'name filed is required'
        },
        notEmpty:{
                 errorMessage:'name cannot be empty'
        },
        isLength:{
            options:{min:3,max:20},
            errorMessage:'name should be in between 3 to 20 charcters'
        },
        trim:true
    }
}
const idValidationSchema={
    id:{
        in:['params'],
        isMongoId:{
            errorMessage:'id is invalid'
        }
    }
}
app.post('/create-category',checkSchema(categoryValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const body=req.body
    // const categoryObj=new Category(body)  //second method for creating db
    // categoryObj.save()
    Category.create(body)
    .then((category)=>{
        res.status(201).json(category)

    })
    .catch((err)=>{
        res.status(400).json(err)
    })
})
app.get('/list-categories',(req,res)=>{
    Category.find()
    .then((categories)=>{
        res.json(categories)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})


    })
})
app.delete('/remove-category/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }

    const id=req.params.id
    Category.findByIdAndDelete(id)
    .then((category)=>{
        if(!category){
            res.status(400).json({error:'record not found'})
        }else{
            res.json(category)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })
})
app.put('/updatecategory/:id',checkSchema(categoryValidationSchema),checkSchema(idValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    const body=req.body
    Category.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((category)=>{
        if(!category){
            res.status(400).json({error:'record not found'})
        }else{
            res.json(category)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })
})
app.get('/category/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
   
    Category.findById(id)
    .then((category)=>{
        if(!category){
            res.status(400).json({error:'record not found'})
        }else{
            res.json(category)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })
})

const expenseSchema = new Schema({
    expenseDate: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    category: {

        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
        
    },
    description: {
        type: String
    }
}, { timestamps: true });
const Expense = model('Expense', expenseSchema)
const expenseValidationSchema = {
    expenseDate: { 
        in: ['body'],
        exists: { 
            errorMessage: 'expense date is required'
        },
        notEmpty: {
            errorMessage: 'date cannot be empty'
        },
        isDate: {
            options: { format: "yyyy-mm-dd"},
            errorMessage: 'date should be in yyyy-mm-dd'
        }, 
        trim: true 
    },
    title: { 
        in : ['body'],
        exists: { 
            errorMessage: 'title field is required'
        },
        notEmpty: {
            errorMessage: 'title cannot be empty'
        },
        isLength: {
            options: { min: 3},
            errorMessage: 'title should be atleast 3 characters'
        },
        trim: true 
    },
    amount: {
        in: ['body'],
        exists: {
            errorMessage: 'amout field is required'
        },
        notEmpty: {
            errorMessage: 'amount cannot be empty'
        },
        isFloat: {
            options: { min: 1},
            errorMessage: 'amount should be a number with minimum 1'
        }
    },
    description: {
        in: ['body'],
        optional: true, 
        exists: { 
            errorMessage: 'description field is required'
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'description should be atleast 5 charactesr'
        }
    },
    category: {
        in: ['body'],
        exists: {
            errorMessage: 'category field is required'
        },
        isMongoId: {
            errorMessage: 'category id is invalid'
        }
    }
}

app.post('/expenses',checkSchema(expenseValidationSchema), (req, res) => {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const body = req.body
    Expense.create(body)

        .then(expense => res.status(201).json(expense))
        .catch(err => res.status(400).json({ error: err.message }))
})
app.get('/expenses',(req,res)=>{
    Expense.find()
    .then((expense)=>{
        res.status(201).json(expense)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})


    })
})
app.get('/expenses/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id

   
    Expense.findById(id)
    .then((expense)=>{
        if(!expense){
            res.status(400).json({error:'record not found'})
        }else{
            res.json(expense)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })
})
app.put('/expenses/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    const body=req.body
    Expense.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((expense)=>{
        if(!expense){
            res.status(400).json({error:'record not found'})
        }else{
            res.json(expense)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })
})
app.delete('/expenses/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
    Expense.findByIdAndDelete(id)
    .then((expense)=>{
        if(!expense){
            res.status(400).json({error:'record not found'})
        }else{
            res.json(expense)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })
})

app.get('/expenses/category/:id',checkSchema(idValidationSchema),(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    const id=req.params.id
   
    Expense.findById({category:id})
    .then((expense)=>{
        if(!expense){
            res.status(400).json({error:'record not found'})
        }else{
            res.json(expense)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })
})



app.listen(port,()=>{
    console.log('server is running port '+port)
})