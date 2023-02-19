const admin = require('firebase-admin');
const serviceAccount = require("../serviceAccKey.json");
const bcrypt = require('bcryptjs')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.listUser = async (req, res) => {
  const usersResult = await admin.auth().listUsers(1000)
  res.json(usersResult.users)
}

exports.viewUser = async (req, res) => {
  try {
    const user = await admin.auth().getUserByEmail(req.body.email)
    res.json(user)
  } catch (err) {
    res.json({ message: 'cannot fetch user data' })
  }
}

exports.createUser = async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  try {
    admin.auth().createUser({
      Name: name,
      email: email,
      emailVerified: false,
      phone: phone,
      password: hash,
      disabled: false
    })
    res.json({ message: 'User Created' })
  } catch (err) {
    console.log(err)
    res.json({
      message: 'Error creating user',
      error: err
    })
  }
};

exports.updateUser = async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  try {
    const user = await admin.auth().updateUser(req.params.id, {
      name: name,
      disabled: false,
      email: email,
      emailVerified: false,
      phone: phone
    })
    res.json(user)
  } catch (e) {
    res.json({ message: e })
  }
};

exports.deleteUser = async (req, res) => {
  admin.auth().deleteUser(req.params.id)
  res.json({ message: 'User deleted' })
};
