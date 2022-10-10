const users = require("../../db/users");

const getUsers = (req, res, next) => {
  res.status(200).json(users);
};

const postUser = (req, res, next) => {
    const id = req.params;
    const {name} = req.body;
    res.status(201).json({message: 'Created', data:{name,id}})
};

module.exports = { getUsers, postUser };
