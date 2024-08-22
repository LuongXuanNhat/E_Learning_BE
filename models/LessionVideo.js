// models/lessionVideos.js
module.exports = (sequelize, DataTypes) => {
  const LessionVideo = sequelize.define(
    "LessionVideo",
    {
      LessionVideo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      class_id: {
        type: DataTypes.INTEGER,
        references: { model: "classes", key: "class_id" },
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      link: DataTypes.STRING,
      created_at: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: "lessionVideos",
    }
  );
  LessionVideo.associate = function (models) {
    LessionVideo.belongsTo(models.Class, { foreignKey: "class_id" });
  };

  return LessionVideo;
};
