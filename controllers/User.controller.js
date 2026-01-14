const ModelUser = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../config/env');

// Ajout un nouvel utilisateur
const register = async (req, res) => {
    try {
        
        // "10" est le nombre de tours de salage
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        
        const user = await ModelUser.create({
            ...req.body,
            password: hashPassword
        });  
        
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const login =  async (req, res) => {
    try {
        // 1 - Recherche l utilisateur dans la base de données 
        const user = await ModelUser.findOne({email: req.body.email });
        // 2 - Si l'utilisateur n'est pas trouvé, renvoie une erreur 404
        if(!user) return res.status(404).json('User not found ! ');
        // avec le mot de passe de l'utilisateur qui est dans la bdd
        const comparePassword = await  bcrypt.compare(
            req.body.password,
            user.password
        );
        // 4 - Si le mot de passe est incorrect, renvoie une erreur 400
        if(!comparePassword) return res.status(400).json("Wrong Credentials !");

        // Crée un JWT
        const token = jwt.sign(
            { id: user._id },
            ENV.TOKEN,
            { expiresIn: "24h" }
        );
  

        const { password, ...others } = user._doc
        
        res.cookie(
            'access_token', 
            token, 
            { httpOnly: true}
        )
        .status(200)
        .json(others)

    } catch (error) {
        
    }
}

module.exports = {
    register,
    login
}