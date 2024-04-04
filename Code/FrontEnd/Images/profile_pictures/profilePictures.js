// profilePictures.js
const profilePictures = 
  {
    '63': require('./default.jpeg'),
    '64': require('./default.jpeg'),
    '65': require('./josh.jpg'),
    '66': require('./emilyj.webp'),
    // Add more user IDs and their corresponding images
  };

const getProfilePicture = (userId) => {
  return profilePictures[userId] || require('./default.jpeg');
};

export default getProfilePicture;
