const database = require('../database');

const crudController = () => {
    const crud = async(req:any, res:any) => {
        try {
            return await database.query(req, res);
        }
        catch(err) {
            res.status(500);
            return res.send('Server Error. Try again later.');
        }
    }
    return { crud };
};

module.exports = crudController;