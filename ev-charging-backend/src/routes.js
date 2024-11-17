// src/routes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const authenticateToken = require('./auth');

const router = express.Router();

// Rota de Registro (para desenvolvimento)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: "Usuário já existe" });
        res.status(201).json({ message: "Usuário registrado com sucesso" });
    });
});

// Rota de Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err || !user || !(await bcrypt.compare(password, user.password))) {
            console.log("Credenciais inválidas.");
            return res.status(403).json({ error: "Credenciais inválidas" });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Login bem-sucedido:", { username, token });
        res.json({ token });
    });
});


// Rota para obter o status de recarga
router.get('/status', authenticateToken, (req, res) => {
    db.get(`SELECT * FROM status LIMIT 1`, (err, row) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar status" });
        res.json(row);
    });
});

router.get('/preferences', authenticateToken, (req, res) => {
    const userId = req.user.id; // Pegando o ID do usuário autenticado
    db.get(`SELECT * FROM preferences WHERE user_id = ?`, [userId], (err, row) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar preferências" });
        res.json(row || { renewableOnly: false, offPeakHours: false }); // Retorna valores padrão caso não haja preferências
    });
});

router.put('/preferences', authenticateToken, (req, res) => {
    const { renewableOnly, offPeakHours } = req.body;
    db.run(`INSERT OR REPLACE INTO preferences (user_id, renewable_only, off_peak_hours) VALUES (?, ?, ?)`, 
        [req.user.id, renewableOnly, offPeakHours], 
        (err) => {
            if (err) return res.status(500).json({ error: "Erro ao salvar preferências" });
            res.json({ message: "Preferências atualizadas com sucesso" });
    });
});

module.exports = router;
