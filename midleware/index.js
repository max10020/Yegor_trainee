

const headerAPI = (req, res, next)=>{
    if(req.headers.api){
        next();
    } else{
        res.status(401).send('Missing API in header')
    }
}

export default headerAPI;