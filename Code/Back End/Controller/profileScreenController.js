const profileScreenModel = require('../Model/profileScreenModel');

const profileScreenController = {
    fetchUserProfile: async function(req, res) {
        try {
            const userId = req.params.userId; // Assuming you get userId from URL params
            const userProfile = await profileScreenModel.getUserProfile(userId);

            // Check if userProfile is not undefined before sending
            if (userProfile) {
                res.json({ success: true, data: userProfile });
            } else {
                res.status(404).json({ success: false, message: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    // Add other controller functions as necessary...
};

module.exports = profileScreenController;
