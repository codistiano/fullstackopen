const app = require('../app')
const logger = require('./logger')

const tokenExtractor  = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', ''); 
    } else {
        req.token = null; 
    }
    next();
};

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'ValidationError') {
        return res.status(400).json({'Error': err.message})
    } else if (err.name === 'CastError') {
        return res.status(400).json({'error': err.message})
    }
    next(err)
}

module.exports = {
    errorHandler,
    tokenExtractor
}