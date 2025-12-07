
import mysql from 'mysql2';

const db = mysql.createPool({
    host: "yamabiko.proxy.rlwy.net",
    user: "root",
    password: "dgWPvJfaTKHCvWiTSczogzuKnpNVTXCx",
    port: 42127,
    database: "railway"
});

export default db;

