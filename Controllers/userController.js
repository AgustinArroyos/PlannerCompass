import User from '../Models/User.js'
import generateID from '../helpers/generateid.js'
import generateJWT from '../helpers/generateJWT.js'

const createUser = async (req, res) => {
    
    // Evitar registros duplicados
    const { dni } = req.body;
    const existUser = await User.findOne({ dni });
    if (existUser) {
      const error = new Error("The D.N.I. is already registered");
      return res.status(400).json({ msg: error.message });
    }

    try {
      const user = new User(req.body);
      user.token = generateID();
      await user.save();
  
      res.json({
        msg: "User created successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
  
const signIn = async (req, res) => { 

  const { email, password } = req.body;
  // Comprobar si el usuario existe
  const user = await User.findOne({ email });
  
  if (!user) {
    const error = new Error("User not found");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar su password
  if (await user.comprobarPassword(password)) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("Password is incorrect");
    return res.status(403).json({ msg: error.message });
  }}

  const perfil = async (req, res) => {
    const  { usuario } = req

    res.json(usuario);
    
      };

 export {createUser,signIn, perfil} ;