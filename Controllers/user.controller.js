import UserModel from '../Models/user.model.js';

class UserController {
    // Class constructor
    constructor() {}

    // User Controller methode begynder 

    //Kalder model list
    list = async(req, res) => {
            const result = await UserModel.findAll({
                //Attributes = felter
                attributes: ['id', 'name', 'lastname'],
                limit: 3,
                order: ['name']

            })
            res.json(result)
        }
        //Hent bruger
    get = async(req, res) => {
            const result = await UserModel.findAll({
                where: { id: req.params.id }
            })
            res.json(...result)
        }
        //Opret brugere
    create = async(req, res) => {
            const { name, lastname, email, password } = req.body;

            if (name && lastname && email && password) {
                const model = await UserModel.create(req.body)
                return res.json({ newid: model.id })
            } else {
                res.send(418)
            }
        }
        //opdatere brugere
    update = async(req, res) => {
            const { name, lastname, email, password, id } = req.body;

            if (name && lastname && email && password && id) {
                const model = await UserModel.update(req.body, { where: { id: id } })
                return res.json({ status: true })
            } else {
                res.send(418)
            }
        }
        //Slet brugere
    delete = async(req, res) => {
            try {
                await UserModel.destroy({ where: { id: req.params.id } })
                res.sendStatus(200)
            } catch (err) {
                res.send(err)
            }
        }
        // User Controller metode slutter 
}

export default UserController;