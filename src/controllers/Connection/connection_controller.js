
class Connection {

    async connectionGetter(req, res) {
        res.status(200).json({message : 'Connection'});    
    } 
}


module.exports = new Connection();
