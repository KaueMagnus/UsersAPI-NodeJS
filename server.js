import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())


// Create user
app.post('/users', async (req, res) => {
    
    // Utilizando uma Promise para que o JS espere a informação
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)

})


// Get all users
app.get('/users', async (req, res) => {

    const findUsers = await prisma.user.findMany()

    res.status(200).json(findUsers)
})

// Edit user
// app.put("/users")

// Edit a specific attribute of the user
//app.patch("/users")

// Delete user
// app.delete("/users")


app.listen(3000)
