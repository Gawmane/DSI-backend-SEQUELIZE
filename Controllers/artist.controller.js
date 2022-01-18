import { Sequelize } from 'sequelize';
import ArtistModel from '../Models/artist.model.js';
import SongModel from '../Models/song.model.js';

//Konst til søgefunktion 
const Op = Sequelize.Op;

//Én til mange forhold - artist kan have mange sangmodeller
//Sange tilhøre en artist
ArtistModel.hasMany(SongModel)
SongModel.belongsTo(ArtistModel)
class ArtistController {
    constructor() {}

    //artist controller methode begynder 

    //Kalder model list
    list = async(req, res) => {
            const result = await ArtistModel.findAll({
                //Attributes = felter
                attributes: ['id', 'name'],
                limit: 3,
                order: ['name'],
            })
            res.json(result)

        }
        //Hent sange include artist
    get = async(req, res) => {
            const result = await SongModel.findAll({
                where: { id: req.params.id },
                //Tilføjer vores sang database  
                include: {
                    model: SongModel,
                    attributes: ['id', 'title']
                }
            });
            res.json(...result)

        }
        //Opret sang include (JOIN) artist
    create = async(req, res) => {
            const { title, content, artist_id } = req.body;

            if (title && content && artist_id) {
                const model = await SongModel.create(req.body)
                return res.json({ newid: model.id })
            } else {
                res.send(418)
            }

        }
        //Opdate sange include (JOIN) artist
    update = async(req, res) => {
            const { title, content, artist_id, id } = req.body;
            if (title && content && artist_id && id) {
                const model = await SongModel.update(req.body, { where: { id: id } })
                return res.json({ status: true })
            } else {
                res.send(418)
            }

        }
        //Slet  artist
    delete = async(req, res) => {
            try {
                await ArtistModel.destroy({ where: { id: req.params.id } })
                res.sendStatus(200)
            } catch (err) {
                res.send(err)
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
                },
                attributes: ['id', 'title'],
                include: {
                    model: ArtistModel,
                    attributes: ['id', 'name']
                }

            })
            res.json(result)
        }
        // artist controller metode slutter 
}
export default ArtistController;