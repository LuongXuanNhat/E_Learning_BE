// models/token.js
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    token_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'user_id' }},
    token: { type: DataTypes.STRING, unique: true },
    created_at: DataTypes.DATE,
    expires_at: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'tokens'
  });

  Token.associate = function(models) {
    Token.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Token;
};
