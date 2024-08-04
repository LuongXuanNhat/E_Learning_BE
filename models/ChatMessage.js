// models/chat_message.js
module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define('ChatMessage', {
    message_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    chat_room_id: { type: DataTypes.INTEGER, references: { model: 'chat_rooms', key: 'chat_room_id' }},
    sender_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'user_id' }},
    content: DataTypes.TEXT,
    sent_at: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'chat_messages'
  });

  ChatMessage.associate = function(models) {
    ChatMessage.belongsTo(models.ChatRoom, { foreignKey: 'chat_room_id' });
    ChatMessage.belongsTo(models.User, { foreignKey: 'sender_id' });
  };

  return ChatMessage;
};
