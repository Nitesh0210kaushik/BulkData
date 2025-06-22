const contactModel = require('../models/contact.model');
const recordService = require('../services/record.service');
exports.bulkInsert = async (req, res) => {
    try {
        const records = req.body;
        const result = await recordService.insertBulk(records);
        res.status(201).json({ message: "Records inserted successfully", data: result });
    } catch (error) {
        res.status(500).json({ message: "Error inserting records", error: error.message });
    }
};

exports.getAllRecords = async (req, res) => {
    try {
        const result = await recordService.fetchAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching records", error: error.message });
    }
};

exports.updateOne = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedUser = await recordService.updateOne(id, updatedData);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};

exports.search = async (req, res) => {
    const { searchText } = req.body;

    try {
        const data = await recordService.search(searchText);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: "Error finding user", error });
    }
};
exports.countActiveUser = async (req, res) => {
    try {
        const data = await recordService.countActiveUser();
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: "Error finding user", error });

    }

}
exports.signup = async (req, res) => {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const signupBody = req.body;
        const user = await recordService.signup(signupBody);

        return res.status(201).json({
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

exports.contactMe = async (req, res) => {
    console.log("chech hit")
    try {
        const contactData = req.body;
        console.log("Request received:", req.body);

        const savedContact = await recordService.contactMe(contactData);

        return res.status(201).json({
            // message: 'Your message has been received. We will get back to you shortly.',
            data: savedContact
        });
    } catch (error) {
        // console.error('Contact form error:', error.message);
        return res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};