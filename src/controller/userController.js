import userService from '../services/userService'

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!"
    })
  }
  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {}
  })
}

let handleGetAllUser = async (req, res) => {
  let id = req.query.id;
  let users = await userService.getAllUser(id);
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: []
    })
  }
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users
  })
}

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateDataUser(data);
  return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!"
    })
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
}

const handleGetAllCode = async (req, res) => {
  try {
    const type = req.query.type;
    let data = await userService.getAllCodeService(type);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from sever'
    })
  }
}

module.exports = {
  handleLogin, handleGetAllUser, handleCreateNewUser,
  handleEditUser, handleDeleteUser, handleGetAllCode
}
