const userService = require('../services/userService')
const logger = require('../config/logger')

const viewProfile = async (req, res) => {
    const userId = req.user.id

    try {
        const user = await userService.getElementById(userId)
        if (!user) {
            return res.status(404).json({ error: 'No such user found' })
        }
        res.status(200).json(user)
    } catch (error) {
        logger.log('error', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { userName } = req.body
        const userId = req.user.id
        const updatedUser = await userService.updateUserById(userId, userName)
        res.json({ message: 'User updated succesfully', user: updatedUser })
    } catch (error) {
        logger.log('error', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id
        await userService.deleteUserById(userId)
        res.json({ message: 'user deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting the user' })
    }
}

module.exports = { viewProfile, updateProfile, deleteProfile }
