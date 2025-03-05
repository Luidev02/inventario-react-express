
const dashboard = async(req,res) =>{
    try {
        res.status(200).json({status:200, message: 'Dashboard Page'});
    } catch (error) {
        res.status(500).json({status:500, message: error.message});
    }
}

export { dashboard };