export default async function verifyAdmin(req, res, next) {
  if (!token) return res.status(404).send({ error: "Access denied" })
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.verified = verified
    next()
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
}