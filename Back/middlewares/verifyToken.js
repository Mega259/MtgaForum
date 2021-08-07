import jwt from 'jsonwebtoken'

export default async function verifyToken(req, res, next) {
    const token = req.header("auth-token")
    if (!token) return res.status(404).send({error: "Access denied"})
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send({message: err.message})
    }
}