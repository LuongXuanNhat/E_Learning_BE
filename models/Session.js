// models/session.js
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    session_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'user_id' }},
    session_token: { type: DataTypes.STRING, unique: true },
    created_at: DataTypes.DATE,
    expires_at: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'sessions'
  });

  Session.associate = function(models) {
    Session.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Session;
};
