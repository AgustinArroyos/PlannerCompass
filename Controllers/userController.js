import User from '../Models/User.js'
import generateID from '../helpers/generateid.js'
import generateJWT from '../helpers/generateJWT.js'
import Joi from 'joi';

const userSchema = Joi.object().keys({
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
  dni: Joi.string().min(1).max(100).required(),
  birthDate: Joi.date().required(),
  city: Joi.string().min(1).max(100).required(),
  country: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(100).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

const createUser = async (req, res) => {
  const { value, error } = userSchema.validate(req.body);

  if (error) {
    res.status(400).send(error);
    return;
  }
  const { dni } = value;
  const existUser = await User.findOne({ dni });
  if (existUser) {
    const error = new Error("The D.N.I. is already registered");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateID();
    await user.save();

    res.status(200).json({
      msg: "User created successfully",
    });
  } catch (error) {
    console.log(error);
  }

};

const signIn = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found!");
    return res.status(404).json({ msg: error.message });
  }

  if (await user.comprobarPassword(password)) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("Password is incorrect");
    return res.status(403).json({ msg: error.message });
  }
}



//
const perfil = async (req, res) => {
  const { usuario } = req

  res.json(usuario);

};

export { createUser, signIn, perfil };