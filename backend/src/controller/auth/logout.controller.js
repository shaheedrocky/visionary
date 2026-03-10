export const logoutController = async (_, res) => {
    res.cookie('token', "", { maxAge: 0 });
    return res.status(200).json({
        statusCode: 200,
        success: true,
        message: "User successfully created!",
    })
}