const express = require('express')
const uuid = require('uuid')
const app = express()
app.use(express.json())



const users = []


const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ Error: "User not found" })
    }

    request.userIndex = index
    request.userId = id
    next()
}


app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { order, clientName, price } = request.body

    const user = { id: uuid.v4(), order, clientName, price, "status": "Em preparação" }

    users.push(user)
    return response.status(201).json(user)
})



app.put('/users/:id',checkUserId, (request, response) => {

    const { order, clientName, price } = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedUser = { id, order, clientName, price, "status": "Em preparação" }



    users[index] = updatedUser

    return response.json(updatedUser)
})



app.patch('/users/:id',checkUserId, (request, response) => {
    
    const { order, clientName, price } = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedStatus = { id, order, clientName, price, "status": "PRONTO!!!" }

    

    users[index] = updatedStatus

    return response.json(updatedStatus)
})

app.delete('/users/:id',checkUserId, (request, response) => {
    const index = request.userIndex

   

    users.splice(index, 1)

    return response.status(204).json(users)
})


app.get('/users/:id', (request, response) => {
    const { id } = request.params
    const { order, clientName, price } = request.body

    const unicUser = { order }

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ Error: "User not found" })
    }

    users[index] = unicUser

    return response.json(unicUser)
})












app.listen(3001)
