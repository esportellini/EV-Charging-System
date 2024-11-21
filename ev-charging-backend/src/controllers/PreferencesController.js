const PreferencesModel = require('../models/PreferencesModel');

const PreferencesController = {
    getPreferences: (req, res) => {
        PreferencesModel.findByUserId(req.user.id, (err, preferences) => {
            if (err) return res.status(500).json({ error: 'Erro ao buscar preferências' });
            res.json(preferences || { renewableOnly: false, offPeakHours: false });
        });
    },
    updatePreferences: (req, res) => {
        const { renewableOnly, offPeakHours } = req.body;
        PreferencesModel.updatePreferences(req.user.id, renewableOnly, offPeakHours, (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao salvar preferências' });
            res.json({ message: 'Preferências atualizadas com sucesso' });
        });
    },
};

module.exports = PreferencesController;
