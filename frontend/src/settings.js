export default {
  NUMBER_OF_REELS: process.env.NUMBER_OF_REELS || 5,
  NUMBER_OF_ENTITIES: process.env.NUMBER_OF_ENTITIES || 3,
  HEIGHT_OF_ENTITY: process.env.HEIGHT_OF_ENTITY || 100,
  SPIN_TIME: process.env.SPIN_TIME || 10000,

  STATIC_FILES_BACKEND_URL: process.env.STATIC_FILES_BACKEND_URL || 'http://localhost:3000',
};
