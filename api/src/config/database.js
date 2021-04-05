module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'bsystemdb',
  define: {
    timestamps: true,
    underscored: true,
  },
};
