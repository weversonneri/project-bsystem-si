module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'mainbsystemdb',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
