module.exports = {
  [process.env.NODE_ENV || 'development']: {
  "development": {
    "username": "xtolfiswmuypvu",
    "password": "80604ca44548c7dc9cb085ab0050d799510802165243c2f61f9720090b0142e1",
    "database": "d8srm87upt5q9u",
    "host": "ec2-3-234-85-177.compute-1.amazonaws.com",
    "dialect": "postgres",
    "port": 5432,
    "url": process.env.DATABASE_URL
  }
}}