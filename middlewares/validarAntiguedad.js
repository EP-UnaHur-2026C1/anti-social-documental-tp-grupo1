const validarAntiguedad = (req, res, next) => {
    const comentario = req.comentario;

    const mesesLimite = parseInt(process.env.X_MESES) || 6;

    const fechaActual = new Date();
    const fechaComentario = new Date(comentario.fecha);

    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth();

    const anioComentario = fechaComentario.getFullYear();
    const mesComentario = fechaComentario.getMonth();

    const mesesTranscurridos = ((anioActual - anioComentario) * 12) + (mesActual - mesComentario);

    if (mesesTranscurridos < mesesLimite) {
        return res.status(400).json({
            mensaje: `El comentario aún no tiene ${mesesLimite} meses de antigüedad.`
        });
    }

    if (!comentario.esVisible) {
        return res.status(400).json({
            mensaje: "El comentario ya se encuentra oculto."
        });
    }

    next();
};

module.exports = validarAntiguedad;