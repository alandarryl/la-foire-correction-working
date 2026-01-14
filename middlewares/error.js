const createError = (status, message, details = null) => {
    // crée une nouvelle instance d'erreur vide
    const error = new Error()
    /* 
        Definit le code d'etat de l'erreur en fonction du paramètre "status"
    */
    error.status = status
    /* 
        Definit le code d'etat de l'erreur en fonction du paramètre "message"
    */
    error.message = message
    /* 
        Permet d'ajouter des infos supplémentaires si besoin
    */
    error.details = details

    return error;
}

module.exports = createError