const fs = require('fs');
module.exports = (req,res,next) => {
    if(typeof(req.file) === 'undefined' || typeof (req.body) === 'undefined'){
        return res.status(400).json({
            error : "problem will send data"
        })
    }

    console.log(req.file);
    let name = req.body.name;
    let image = req.file.path;

    if(!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') && !(req.file.mimetype).includes('jpg') ){
        fs.unlinkSync(image)
        return res.status(400).json({
            error : "file not support"
        })
    }

    if(req.file.size > 1024*1024){
        fs.unlinkSync(image)
        return res.status(400).json({
            error : "File is Too Large"
        })
    }

    if(!name || !image) {
        return res.status(400).json({
            error : "all fields are required"
        })
    }
    
    next()
}