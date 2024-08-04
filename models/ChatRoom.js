// models/chat_room.js
module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define('ChatRoom', {
    chat_room_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    class_id: { type: DataTypes.INTEGER, references: { model: 'classes', key: 'class_id' }},
    name: DataTypes.STRING,
    created_at: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'chat_rooms'
  });

  ChatRoom.associate = function(models) {
    ChatRoom.belongsTo(models.Class, { foreignKey: 'class_id' });
    ChatRoom.hasMany(models.ChatMessage, { foreignKey: 'chat_room_id' });
  };

  return ChatRoom;
};
