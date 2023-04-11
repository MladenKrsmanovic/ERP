
const requireAdmin=(req,res,next)=>{
    if(req.buyer && req.body.is_admin==1)
    {
        return next();
    }
    else
    {
        return res.status(401).send("Unauthorized");
    }
};

module.exports = { requireAdmin };