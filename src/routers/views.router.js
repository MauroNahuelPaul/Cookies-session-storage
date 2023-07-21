import { Router } from "express";


const router = Router();

const auth = (req, res, next) => {
  if (req.session?.user) {
    return next()
  }
  return res.status(401).json({ status: 'fail', message: 'Auth error' })
}

router.get("/products", auth, async (req, res) => {
  
  if(req.session.user.user_mail === 'adminCoder@coder.com' && req.session.user.user_password === "adminCod3r123")
    req.session.user.user_rol = 'admin'
  else
    req.session.user.user_rol = 'user'
  res.render('products',{user:req.session.user});
});
router.get("/login", (req, res) => {
  res.render('login')
})
router.get("/register", (req, res) => {
  res.render('register')
})

export default router;
