const expressRouter = require('express');
const crud = require('../Controllers/crudController');

function routes() {
    const router = expressRouter.Router();
    const controller = crud();

    const query = (sp:string) => {
        return async function(req:any, res:any) {
            req.sql = { sp };
            await controller.crud(req, res);
        }
    }

    //Classes
    router.route('/classes')
        .get(query('GetClasses'))
        .post(query('AddClass'))

    router.route('/classes/:Id')
        .get(query('GetClass'))
        .put(query('UpdateClass'))
        .delete(query('DeleteClass'))

    //Contacts
    router.route('/contacts')
        .get(query('GetContacts'))
        .post(query('AddContact'))
        .get(query('GetContact'))

    router.route('/contacts/:Id')
        
        .put(query('UpdateContact'))
        .delete(query('DeleteContact'))

    return router;
};

module.exports = routes;