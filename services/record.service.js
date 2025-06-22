const contactModel = require('../models/contact.model');
const User = require('../models/record.model');
const bcrypt = require('bcrypt');


exports.insertBulk = async (users) => {
    return await User.insertMany(users);
};

exports.fetchAll = async () => {
    return await User.find({});
};

exports.updateOne = async (id, updatedData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.search = async (query) => {
    try {
        const result = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                // { email: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } }
            ]
        });

        return result;
    } catch (error) {
        throw new Error("Search query failed: " + error.message);
    }
};
exports.countActiveUser = async () => {
    const data = await User.aggregate([
        { $match: { status: "active" } },
        {
            $group: {
                _id: "$address.city",
                totalUsers: { $sum: 1 },
                // userData: { $push: "$name" }
                userData: { $push: { name: "$name", email: "$email" } }
            }
        },
        {
            $project: {
                _id: 0,
                city: "$_id",
                userData: 1,
                totalUsers: 1
            }
        }
    ])
    return data
}


exports.signup = async (data) => {
    if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    delete data.confirmPassword;

    const newUser = await User.create(data);
    return newUser;
};

exports.contactMe = async ({ name, email, subject, message }) => {
    if (!name || !email || !subject || !message) {
        throw new Error('All fields are required');
    }

    const contact = new contactModel({ name, email, subject, message });
    return await contact.save();
};