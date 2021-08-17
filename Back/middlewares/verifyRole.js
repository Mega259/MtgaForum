import jwt from 'jsonwebtoken'

export default async function verifyAdmin(req, res, next) {
  const token = req.header("auth-token")
  if (!token) return res.status(404).send({ error: "Access denied" })
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    console.log(verified)
    req.role = verified.role
    if (verified.role == 0) next()
    else res.statuts(404).send({ message: "Access denied" })
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
}