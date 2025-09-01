const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ goals: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.helloWorld = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "Hello World! API is running", status: 200 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPlayerByNickname = async (req, res) => {
  try {
    const user = await User.find({ nickname: req.params.nickname });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addHistoryToAllUsers = async (req, res) => {
  try {
    const { date, playersStats } = req.body;

    if (!date || !playersStats || !Array.isArray(playersStats)) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    // Converte a data recebida em objeto Date (início do dia)
    const historyDate = new Date(date);
    const historyStart = new Date(historyDate.setHours(0, 0, 0, 0));

    for (const u of playersStats) {
      const user = await User.findById(u.playerId);
      if (!user) continue;

      // Verifica se já existe histórico para a data
      const historyIndex = user.history.findIndex(
        (h) => h.date.toDateString() === historyStart.toDateString()
      );

      const historyItem = {
        date: historyStart,
        goals: u.goals,
        assists: u.assists,
        errors: u.errors,
      };

      if (historyIndex > -1) {
        // Atualiza o histórico existente
        user.history[historyIndex] = historyItem;
      } else {
        // Adiciona novo histórico
        user.history.push(historyItem);
      }

      // Recalcula totais
      user.goals = user.history.reduce((sum, h) => sum + h.goals, 0);
      user.assists = user.history.reduce((sum, h) => sum + h.assists, 0);
      user.errors = user.history.reduce((sum, h) => sum + h.errors, 0);

      await user.save();
    }

    res.status(200).json({ message: "Histórico atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar histórico" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
