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

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                age: req.query.age,
                email: req.query.email
                
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

// Edit user
app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

// Edit a specific attribute of the user
//app.patch("/users")

// Delete user
app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: "User deleted successfully!"})
})


app.listen(3000)
