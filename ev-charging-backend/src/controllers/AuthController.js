const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthController = {
    login: (req, res) => {
        const { username, password } = req.body;
        UserModel.findByUsername(username, async (err, user) => {
            if (err || !user || !(await bcrypt.compare(password, user.password))) {
                return res.status(403).json({ error: 'Credenciais inválidas' });
            }
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    },
    register: (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        UserModel.createUser(username, hashedPassword, (err) => {
            if (err) return res.status(500).json({ error: 'Usuário já existe' });
            res.status(201).json({ message: 'Usuário registrado com sucesso' });
        });
    },
};

module.exports = AuthController;
