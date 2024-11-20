// src/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Para fins de desenvolvimento, banco em memória

db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    db.run(`CREATE TABLE preferences (
        user_id INTEGER,
        renewable_only BOOLEAN,
        off_peak_hours BOOLEAN,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE status (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        status TEXT,
        energySource TEXT,
        timeRemaining TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    // Inserir um usuário inicial para teste
    db.run(`INSERT INTO users (username, password) VALUES ('teste', 'teste')`);

    // Inserir um status inicial para teste
    db.run(`INSERT INTO status (status, energySource, timeRemaining) VALUES ('Concluido', 'Solar', '0 minutos')`);

    // Verificar os dados inseridos
    db.all(`SELECT * FROM users`, (err, rows) => {
        if (err) {
            console.error('Erro ao consultar usuários:', err);
        } else {
            console.log('Usuários cadastrados:', rows);
        }
    });
});

module.exports = db;
