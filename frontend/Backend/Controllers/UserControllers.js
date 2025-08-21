const User = require('../Model/UserModel');

const getAllUsers = async (req, res, next) => {
    let users; // Consistent variable name
    try {
        users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json({ users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
//data insertion
const addUsers = async (req, res, next) => {
    const { name, gmail, age, address } = req.body;
    const user = new User({ name, gmail, age, address });
    try {
        await user.save();
        return res.status(201).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
    //not insert user
    if (!user) {
        return res.status(400).json({ message: 'User not created' });
    }
};
//fetch dayta by id
const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
//update user
const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const { name, gmail, age, address } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { name, gmail, age, address }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};
//delete account
const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;