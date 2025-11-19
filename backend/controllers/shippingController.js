
const db = require('../models/index.js');

const checkPincode = (req, res) => {
    const { pincode } = req.params;

    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
        return res.status(400).json({ serviceable: false, message: 'Invalid pincode format.' });
    }

    const location = db.serviceablePincodes.find(p => p.pincode === pincode);

    if (location) {
        res.json({
            serviceable: true,
            city: location.city,
            state: location.state,
        });
    } else {
        res.status(404).json({ serviceable: false, message: 'Sorry, this pincode is not serviceable.' });
    }
};

module.exports = {
    checkPincode,
};