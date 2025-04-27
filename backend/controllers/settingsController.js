const User = require('../models/User');
const Employee = require('../models/Employee');

// Get profile settings
exports.getProfileSettings = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Find the employee associated with this user or create if it doesn't exist
    let employee = await Employee.findOne({ createdBy: userId });
    if (!employee) {
      // Create a new employee record with default values
      employee = await Employee.create({
        name: user.name,
        email: user.email,
        createdBy: userId
      });
    }
    
    // Return combined profile data
    res.json({
      name: user.name,
      email: user.email,
      phone: employee.phone || '',
      department: employee.department || '',
      position: employee.position || '',
      joinDate: employee.joinDate || new Date(),
      avatar: user.avatar || ''
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get security settings
exports.getSecuritySettings = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return security settings
    // In a real app, these would be stored in the user document
    // For now, we'll return default values
    res.json({
      twoFactorEnabled: user.twoFactorEnabled || false,
      loginNotifications: user.loginNotifications || false
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get notification preferences
exports.getNotificationPreferences = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return notification preferences
    // In a real app, these would be stored in the user document
    // For now, we'll return default values
    res.json({
      leaveRequests: true,
      performanceReviews: true,
      payrollUpdates: true,
      companyAnnouncements: true,
      pushNotifications: false,
      attendanceReminders: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get app preferences
exports.getAppPreferences = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Return app preferences
    // In a real app, these would be stored in the user document
    // For now, we'll return default values
    res.json({
      darkMode: false,
      systemLanguage: true,
      highContrast: false,
      reducedMotion: false
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile settings
exports.updateProfileSettings = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phone } = req.body;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Find the employee associated with this user or create if it doesn't exist
    let employee = await Employee.findOne({ createdBy: userId });
    if (!employee) {
      // Create a new employee record with default values
      employee = await Employee.create({
        name: user.name,
        email: user.email,
        createdBy: userId
      });
    }
    
    // Update user data
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    
    // Update employee data
    if (phone) {
      employee.phone = phone;
      await employee.save();
    }
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update security settings
exports.updateSecuritySettings = async (req, res) => {
  try {
    const userId = req.params.id;
    const { twoFactorEnabled, loginNotifications } = req.body;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update security settings
    // In a real app, these would be stored in the user document
    user.twoFactorEnabled = twoFactorEnabled !== undefined ? twoFactorEnabled : user.twoFactorEnabled;
    user.loginNotifications = loginNotifications !== undefined ? loginNotifications : user.loginNotifications;
    await user.save();
    
    res.json({ message: 'Security settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update notification preferences
exports.updateNotificationPreferences = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // In a real app, we would update the notification preferences in the user document
    // For now, we'll just return a success message
    res.json({ message: 'Notification preferences updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update app preferences
exports.updateAppPreferences = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // In a real app, we would update the app preferences in the user document
    // For now, we'll just return a success message
    res.json({ message: 'App preferences updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // In a real app, we would handle file upload and update the avatar URL
    // For now, we'll just return a success message
    res.json({ message: 'Avatar uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};