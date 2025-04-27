const Performance = require('../models/Performance');
const Employee = require('../models/Employee');

// Get employee performance overview
exports.getEmployeePerformance = async (req, res) => {
  try {
    // Find the employee's performance reviews
    const performances = await Performance.find({ employee: req.params.id })
      .sort({ reviewDate: -1 })
      .populate('reviewer');
    
    if (performances.length === 0) {
      // If no performance reviews found, create a default response
      return res.json({
        currentRating: 0,
        lastReviewDate: null,
        nextReviewDate: new Date(Date.now() + 90 * 86400000).toISOString(), // 90 days from now
        trend: 'new'
      });
    }
    
    // Get the most recent performance review
    const latestPerformance = performances[0];
    
    // Calculate the next review date (6 months after the last review)
    const nextReviewDate = new Date(latestPerformance.reviewDate);
    nextReviewDate.setMonth(nextReviewDate.getMonth() + 6);
    
    // Calculate the trend by comparing the latest review with the previous one
    let trend = 'stable';
    if (performances.length > 1) {
      const previousPerformance = performances[1];
      if (latestPerformance.overallRating > previousPerformance.overallRating) {
        trend = 'improving';
      } else if (latestPerformance.overallRating < previousPerformance.overallRating) {
        trend = 'declining';
      }
    }
    
    // Format the response
    const performance = {
      currentRating: latestPerformance.overallRating || 0,
      lastReviewDate: latestPerformance.reviewDate,
      nextReviewDate: nextReviewDate.toISOString(),
      trend
    };
    
    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employee skills
exports.getEmployeeSkills = async (req, res) => {
  try {
    // Find the employee's most recent performance review
    const latestPerformance = await Performance.findOne({ employee: req.params.id })
      .sort({ reviewDate: -1 });
    
    if (!latestPerformance || !latestPerformance.kpis || latestPerformance.kpis.length === 0) {
      // If no performance review or KPIs found, return default skills
      return res.json([
        { name: 'Communication', rating: 0, maxRating: 5 },
        { name: 'Technical Knowledge', rating: 0, maxRating: 5 },
        { name: 'Problem Solving', rating: 0, maxRating: 5 },
        { name: 'Teamwork', rating: 0, maxRating: 5 },
        { name: 'Leadership', rating: 0, maxRating: 5 }
      ]);
    }
    
    // Format the KPIs as skills
    const skills = latestPerformance.kpis.map(kpi => ({
      name: kpi.metric,
      rating: kpi.score,
      maxRating: 5 // Assuming a 5-point scale
    }));
    
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employee goals
exports.getEmployeeGoals = async (req, res) => {
  try {
    // Find the employee's most recent performance review
    const latestPerformance = await Performance.findOne({ employee: req.params.id })
      .sort({ reviewDate: -1 });
    
    if (!latestPerformance || !latestPerformance.nextGoals) {
      // If no performance review or goals found, return an empty array
      return res.json([]);
    }
    
    // Parse the nextGoals field (assuming it's a comma-separated list or JSON string)
    let goals = [];
    try {
      // Try to parse as JSON
      goals = JSON.parse(latestPerformance.nextGoals);
    } catch (e) {
      // If not JSON, split by commas and format
      const goalsList = latestPerformance.nextGoals.split(',').map(goal => goal.trim());
      goals = goalsList.map((goal, index) => ({
        id: index + 1,
        title: goal,
        dueDate: new Date(Date.now() + 90 * 86400000).toISOString(), // 90 days from now
        status: 'In Progress',
        progress: 0
      }));
    }
    
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get employee feedback
exports.getEmployeeFeedback = async (req, res) => {
  try {
    // Find all performance reviews for the employee
    const performances = await Performance.find({ employee: req.params.id })
      .sort({ reviewDate: -1 })
      .populate('reviewer');
    
    if (performances.length === 0) {
      // If no performance reviews found, return an empty array
      return res.json([]);
    }
    
    // Format the performance reviews as feedback
    const feedback = performances.map((performance, index) => ({
      id: index + 1,
      reviewer: performance.reviewer ? performance.reviewer.name : 'Anonymous',
      date: performance.reviewDate,
      content: performance.feedback || 'No feedback provided.',
      rating: performance.overallRating || 0
    }));
    
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add performance review
exports.addReview = async (req, res) => {
  try {
    const review = await Performance.create({
      ...req.body,
      reviewer: req.user._id
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Performance.find()
      .populate('employee')
      .populate('reviewer');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews by employee
exports.getEmployeeReviews = async (req, res) => {
  try {
    const reviews = await Performance.find({ employee: req.params.id })
      .populate('reviewer');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};