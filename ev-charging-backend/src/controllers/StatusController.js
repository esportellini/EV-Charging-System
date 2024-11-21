const StatusModel = require('../models/StatusModel');
const { getRandomValue } = require('../utils/random');
const statusValues = ['Concluido', 'Em Progresso', 'Pendente'];
const energySources = ['Solar', 'Eólica', 'Hidrelétrica'];

const StatusController = {
    getStatus: (req, res) => {
        StatusModel.findByUserId(req.user.id, (err, status) => {
            if (err) return res.status(500).json({ error: 'Erro ao buscar status' });
            if (!status) {
                const newStatus = {
                    status: getRandomValue(statusValues),
                    energySource: getRandomValue(energySources),
                    timeRemaining: `${Math.floor(Math.random() * 60)} minutos`,
                };
                StatusModel.createStatus(req.user.id, newStatus.status, newStatus.energySource, newStatus.timeRemaining, (err) => {
                    if (err) return res.status(500).json({ error: 'Erro ao salvar status' });
                    res.json(newStatus);
                });
            } else {
                res.json(status);
            }
        });
    },
};

module.exports = StatusController;
