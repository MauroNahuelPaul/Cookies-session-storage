import { Router } from "express";
import { UserModel } from "../models/user.model.js";

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const user = req.body
        const result = await UserModel.create(user)

        res.redirect('/login')
        // res.json({ status: 'success', payload: result })
    }
    catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }

})

router.post('/login', async (req, res) => {
    try {
        const { user_mail, user_password } = req.body
        const user = await UserModel.findOne({ user_mail, user_password }).lean().exec()
        if(!user)
            return res.status(401).json({ status: 'error', error: 'Error en email y/o contraseña' })
        req.session.user = user
        res.redirect('/products')
        
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})

router.get('/deletesession', (req, res) => {
    
    req.session.destroy(err => {
        if (err){
            return res.json({ status: 'error', message: 'Ocurrio un error' })
        }
        return res.redirect('/login')  
        
    })
    
})

export default router