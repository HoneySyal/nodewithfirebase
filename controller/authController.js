const admin = require('firebase-admin');
const serviceAccount = require("../serviceAccKey.json")

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
  const password = req.body.password;
  try {
    await admin.auth().createUser({
      Name: name,
      email: email,
      emailVerified: false,
      phone: phone,
      password: password,
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
  await admin.auth().deleteUser(req.params.id)
  res.json({ message: 'User deleted' })
};

exports.auth = async (req, res) => {
  try {
    admin.auth().ch
  } catch (error) {
    res.json({ error: error });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await admin.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    res.json({ error: error });
  }

};

