const admin = require('firebase-admin');
const serviceAccount = require("../serviceAccKey.json");
const { signInWithEmailAndPassword, getAuth } = require("firebase/auth");

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

exports.login = (req, res) => {
  const auth = getAuth();
  const email = req.body.email;
  const password = req.body.password;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      res.json({
        message: 'user Logged in',
        data: user
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.json({
        errorCode: errorCode,
        errorMessage: errorMessage
      });
    })
};

