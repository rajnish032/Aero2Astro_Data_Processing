import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    index: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    index: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  salary: {
    type: String,
    default: 'Not disclosed',
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  postedDate: {
    type: String,
    trim: true
  },
  jobUrl: {
    type: String,
    required: [true, 'Job URL is required'],
    trim: true,
    unique: true
  },
  source: {
    type: String,
    required: [true, 'Source is required'],
    enum: ['Indeed', 'Naukri', 'LinkedIn', 'Other'],
    default: 'Indeed'
  },
  skills: {
    type: [String],
    default: [],
    index: true
  },
  experience: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Text index for search
jobSchema.index({
  title: 'text',
  company: 'text',
  description: 'text',
  skills: 'text',
  location: 'text'
});

// Pre-save hooks
jobSchema.pre('save', function(next) {
  // Normalize fields
  this.title = this.title.replace(/\s+/g, ' ').trim();
  this.company = this.company.replace(/\s+/g, ' ').trim();
  this.location = this.location.replace(/\s+/g, ' ').trim();
  
  // Extract skills if not provided
  if (this.skills.length === 0 && this.description) {
    const desc = this.description.toLowerCase();
    const techKeywords = ['javascript', 'python', 'java', 'node', 'react', 'angular', 'sql', 'mongodb'];
    this.skills = techKeywords.filter(keyword => desc.includes(keyword));
  }
  
  next();
});

export const Job = mongoose.model('Job', jobSchema);