module.exports = (error, req, res) => {
    res.status(404).json({
        error: error
    })
 }