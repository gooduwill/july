const Task = require('../models/task-model')
const { validationResult } = require('express-validator')

const taskCltr = {}

taskCltr.list = async (req, res) => {
    try {
        const task = await Task.find()
        res.status(200).json(task)

    }
    catch {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' })
    }

    /* Task.find()
     .then((task)=>{
         res.status(201).json(task)
     })
     .catch((err)=>{
         console.log(err)
         res.status(500).json({error:'something went wrong'})
     })*/
}

taskCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    }
    const body = req.body
    try {
        const task = await Task.create(body)
        res.status(201).json(task)

    }
    catch {
        res.status(400).json(err)

    }

    /* Task.create(body)
    .then((task)=>{
        res.status(201).json(task)

    })
    .catch((err)=>{
        res.status(400).json(err)
    })
*/

}
taskCltr.update = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    }
    const id = req.params.id
    const body = req.body
    try {
        const task = await Task.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        if (!task) {
            return res.status(400).json({ error: 'record not found' })
        }
        res.json(task)
    }
    catch {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' })

    }
    /*
    Task.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((task)=>{
        if(!task){
            res.status(400).json({error:'record not found'})
        }
        else
        {
            res.json(task)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    })*/


}

taskCltr.remove = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    }
    const id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            res.status(400).json({ error: 'record not found' })
        }
        res.json(task)
    }
    catch {
        console.log(err)
        res.status(500).json({ error: 'something went wrong' })

    }
    /*
    Task.findByIdAndDelete(id)
    .then((task)=>{
        if(!task){
            res.status(400).json({error:'record not found'})
        }
        else
        {
            res.json(task)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    }) */

}
taskCltr.show = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() })
    }
    const id = req.params.id

    try {
        const task = await Task.findById(id)
        if (!task) {
            res.status(400).json({ error: 'record not found' })
        }
        res.json(task)
    }
    catch {

        console.log(err)
        res.status(500).json({ error: 'something went wrong' })


    }
    /*
    Task.findById(id)
    .then((task)=>{
        if(!task){
            res.status(400).json({error:'record not found'})
        }
        else
        {
            res.json(task)
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})

    }) */



}

module.exports = taskCltr