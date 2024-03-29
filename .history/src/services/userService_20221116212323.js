import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  })
}

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        // user already exist
        let user = await db.User.findOne({
          attributes: ['email', 'roleId', 'password'],
          where: { email: email },
          raw: true
        });
        if (user) {
          //compare password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "ok";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User's isn't not found"
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = "Your's email isn't exist in your system. Please try other email";
      }
      console.log(userData);
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  })
}

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail }
      })
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  })
}

let getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = {};
      if (userId === "All") {
        users = await db.User.findAll({
          attributes: {
            exclude: ['password']
          }
        });
      }
      if (userId && userId !== "All") {
        users = await db.User.findOne({
          where: { id: userId }
        })
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }

  })
}

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email is exist 
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Your email is already in used, please try another email"
        })
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender === '1' ? true : false,
          roleId: data.roleId
        });

        resolve({
          errCode: 0,
          message: "ok"
        })
      }
    } catch (e) {
      reject(e);
    }
  })
}

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId }
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "The user isn't exist"
      })
    } else {
      await db.User.destroy({
        where: { id: userId }
      });
      resolve({
        errCode: 0,
        message: "The user is deleted"
      });
    }
  })
}

let updateDataUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!"
        })
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false
      })
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        resolve({
          errCode: 0,
          message: "Update the user succeeds!"
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `User's not`
        });
      }
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  handleUserLogin, getAllUser, createNewUser, deleteUser, updateDataUser
}