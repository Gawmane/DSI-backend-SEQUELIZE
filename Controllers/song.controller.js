import { Sequelize } from 'sequelize';
import SongModel from "../Models/song.model.js";
import ArtistModel from "../Models/artist.model.js";
//Konst til søgefunktion 
const Op = Sequelize.Op;


ArtistModel.hasMany(SongModel)
SongModel.belongsTo(ArtistModel)
class SongController {
    constructor() {}

    //song controller metode begynder 
    /**
     * Første list med selvvalgte parameter (skal ikke bruges frontend)
     * 
     
        //Kalder model list
        list = async(req, res) => {
                const result = await SongModel.findAll({
                    limit: 9,
                    order: ['title'],

                })
                res.json(result)

            }
    */
    //List med JOIN (skal bruges til frontend)

    list = async(req, res) => {
            const orderby = [req.query.orderby || 'id']
            orderby.push(req.query.dir || 'ASC')
            const limit = req.query.limit || 1000
            const result = await SongModel.findAll({
                attributes: ['id', 'title'],
                limit: Number(limit),
                order: [orderby],
                include: {
                    model: ArtistModel,
                    attributes: ['id', 'name']
                }
            })
            res.json(result)
        }
        //Hent sange
    get = async(req, res) => {
            const result = await SongModel.findAll({
                where: { id: req.params.id }
            });
            res.json(...result)

        }
        //Opret sange
    create = async(req, res) => {
            const { title, content, artist_id } = req.body;

            if (title && content && artist_id) {
                const model = await SongModel.create(req.body)
                return res.json({ newid: model.id })
            } else {
                res.send(418)
            }

        }
        //Opdatere sange
    update = async(req, res) => {
        const { title, content, artist_id, id } = req.body;
        if (title && content && artist_id && id) {
            const model = await SongModel.update(req.body, { where: { id: id } })
            return res.json({ status: true })
        } else {
            res.send(418)
        }

    }

    //Søgefunktion med JOIN
    search = async(req, res) => {
            const result = await SongModel.findAll({
                where: {
                    title: {
                        [Op.like]: `%${req.query.keyword}%`
                    },
                    content: {
                        [Op.like]: `%${req.query.keyword}%`
                    }
                }

            })
            res.json(result)
        }
        //Slet sang

    delete = async(req, res) => {
            try {
                await SongModel.destroy({ where: { id: req.params.id } })
                res.sendStatus(200)
            } catch (err) {
                res.send(err)
            }
        }
        // song controller metode slutter 
}
export default SongController;