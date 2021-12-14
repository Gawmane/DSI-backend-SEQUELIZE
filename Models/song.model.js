import db from '../Config/db.config.js';

class SongModel {
    constructor() {
            console.log('class songmodel is loaded');
        }
        //Returner new promise 
    list = (req, res) => {
        return new Promise((resolve, reject) => {
            //Kommer der noget fra API
            const orderBy = req.query.orderBy || 'id';
            const limit = req.query.limit ? ` LIMIT ${req.query.limit}` : '';

            //Hent id og title fra song order by vores const
            let sql = `SELECT song.id, song.title, artist.name AS artist
             FROM song
             INNER JOIN artist
             ON song.artist_id = artist.id
              ORDER BY ${orderBy} ${limit} `;
            db.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
    get = (req, res) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT song.id, song.title, song.content, artist.name AS artist, song.created
                            FROM song
                            INNER JOIN artist
                            ON song.artist_id = artist.id
                            WHERE S.id = ?
                            `;
            db.query(sql, [req.params.id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(...result)
                }
            })
        })
    }
    create = (req, res) => {
        return new Promise((resolve, reject) => {
            const arrFormValues = (Object.values(req.body));
            const sql = `INSERT INTO song(title, content, artist_id) 
        VALUES(?,?,?)`;
            db.query(sql, arrFormValues, (err, result) => {
                if (err) {
                    return err
                } else {
                    resolve({ status: "OK", id: result.insertId });
                }
            })
        })
    }
    update = (req, res) => {
        return new Promise((resolve, reject) => {
            const arrFormValues = (Object.values(req.body));

            const sql = `UPDATE song
            SET title = ?, content = ?, artist_id =?
            WHERE id = ?`;
            db.query(sql, arrFormValues, (err, result) => {
                if (err) {
                    return err
                } else {
                    resolve({ status: "OK", id: req.body.id });
                }
            })
        })
    }
    delete = (req, res) => {
        return new Promise((resolve, reject) => {
            const arrFormValues = (Object.values(req.body));

            //Desc for at tage fra det sidste tal - altså nyeste tilføjelse
            //Limit 1 for kun at slette en og ikke alle på en gang
            const sql = `DELETE FROM song 
            order by id desc 
             limit 1`;
            db.query(sql, arrFormValues, (err, result) => {
                if (err) {
                    return err
                } else {
                    resolve({ status: "OK" });
                }
            })
        })
    }
}


export default SongModel;