const express = require('express');
const bcrypt = require('bcryptjs'); // Para criptografar a senha
const db = require('./db');
const jwt = require('jsonwebtoken'); // Para gerar o token
const cors = require('cors');
const app = express();
const port = 5000;
require('dotenv').config(); // Isso carrega as variáveis do .env



// Configurar o middleware CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permitir requisições do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

app.use(express.json());

// Função de autenticação de token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Rota de login (já existente)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
        if (err) {
            return res.status(500).send('Erro no servidor');
        }
        if (!row || row.password !== password) {
            return res.status(401).send('Credenciais inválidas');
        }

        const token = jwt.sign({ id: row.id, username: row.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Rota de cadastro de novo usuário
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
        if (err) {
            return res.status(500).send('Erro no servidor');
        }
        if (row) {
            return res.status(400).send('Usuário já existe');
        }

        const hashedPassword = password;//bcrypt.hashSync(password, 10);

        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], (err) => {
            if (err) {
                return res.status(500).send('Erro ao criar usuário');
            }
            res.json({ message: 'Usuário criado com sucesso' });
            db.all(`SELECT * FROM users`, (err, rows) => {
                if (err) {
                    console.error('Erro ao consultar usuários:', err);
                } else {
                    console.log('Usuários cadastrados:', rows);
                }
            });
        });
    });
});

// Array de valores possíveis
const statusValues = ['Concluido', 'Em Progresso', 'Pendente'];
const energySources = ['Solar', 'Eólica', 'Hidrelétrica'];

// Função para escolher um valor aleatório de um array
function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Rota para obter o status de recarga (protege com autenticação)
app.get('/api/status', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const randomStatus = getRandomValue(statusValues);
    const randomEnergySource = getRandomValue(energySources);
    const randomNumber = Math.floor(Math.random() * 61); // Escolhe um número entre 0 e 60

    db.get(`SELECT * FROM status WHERE user_id = ?`, [userId], (err, row) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar status" });

        if (!row) {
            db.run(`INSERT INTO status (user_id, status, energySource, timeRemaining) VALUES (?, ?, ?, ?)`, [userId, randomStatus, randomEnergySource, randomNumber], (err) => {
                if (err) return res.status(500).json({ error: "Erro ao inserir status exemplo" });

                db.get(`SELECT * FROM status WHERE user_id = ?`, [userId], (err, row) => {
                    if (err) return res.status(500).json({ error: "Erro ao buscar status" });
                    res.json(row);
                });
            });
        } else {
            res.json(row);
        }
    });
});

// Rota para atualizar as preferências do usuário (protege com autenticação)
app.put('/api/preferences', authenticateToken, (req, res) => {
    const { renewableOnly, offPeakHours } = req.body;
    const userId = req.user.id;  // Pegando o ID do usuário autenticado

    // Verifique se as preferências já existem no banco de dados
    db.get(`SELECT * FROM preferences WHERE user_id = ?`, [userId], (err, row) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar preferências" });

        if (row) {
            // Se as preferências já existem, vamos atualizá-las
            db.run(`UPDATE preferences SET renewable_only = ?, off_peak_hours = ? WHERE user_id = ?`, [renewableOnly, offPeakHours, userId], (err) => {
                if (err) return res.status(500).json({ error: "Erro ao atualizar preferências" });
                return res.json({ message: "Preferências atualizadas com sucesso" });
            });
        } else {
            // Se não existem, vamos criar um novo registro de preferências
            db.run(`INSERT INTO preferences (user_id, renewable_only, off_peak_hours) VALUES (?, ?, ?)`, [userId, renewableOnly, offPeakHours], (err) => {
                if (err) return res.status(500).json({ error: "Erro ao salvar preferências" });
                return res.json({ message: "Preferências salvas com sucesso" });
            });
        }
    });
});

// Rota para obter as preferências do usuário (protege com autenticação)
app.get('/api/preferences', authenticateToken, (req, res) => {
    const userId = req.user.id; // Pegando o ID do usuário autenticado

    db.get(`SELECT * FROM preferences WHERE user_id = ?`, [userId], (err, row) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar preferências" });
        res.json(row || { renewableOnly: false, offPeakHours: false }); // Se não houver preferências, retorna valores padrão
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
