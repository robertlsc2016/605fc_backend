const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "O nome é obrigatório"],
      trim: true,
      minlength: [3, "O nome deve ter no mínimo 3 caracteres"],
      maxlength: [50, "O nome deve ter no máximo 50 caracteres"],
    },
    description: {
      type: String,
      default: "",
    },
    nickname: {
      type: String,
      required: [true, "O apelido é obrigatório"],
      trim: true,
      maxlength: [30, "O apelido deve ter no máximo 30 caracteres"],
    },
    photo: {
      type: String,
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/,
        "A foto deve ser uma URL válida de imagem",
      ],
    },
    goals: {
      type: Number,
      default: 0,
      min: [0, "Gols não podem ser negativos"],
    },
    assists: {
      type: Number,
      default: 0,
      min: [0, "Assistências não podem ser negativas"],
    },
    errors: {
      type: Number,
      default: 0,
      min: [0, "Erros não podem ser negativos"],
    },
    history: {
      type: [
        {
          date: {
            type: Date,
            required: [true, "A data do histórico é obrigatória"],
          },
          goals: {
            type: Number,
            default: 0,
            min: [0, "Gols não podem ser negativos"],
          },
          assists: {
            type: Number,
            default: 0,
            min: [0, "Assistências não podem ser negativas"],
          },
          errors: {
            type: Number,
            default: 0,
            min: [0, "Erros não podem ser negativos"],
          },
        },
      ],
      default: [], // 👈 garante que o histórico inicial seja um array vazio
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
