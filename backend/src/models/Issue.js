const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    type: {
        type: String,
        required: [true, 'Issue type is required'],
        enum: {
            values: ['cloud-security', 'reteam-assessment', 'vapt'],
            message: 'Issue type must be one of: cloud-security, reteam-assessment, vapt'
        }
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [5000, 'Description cannot exceed 5000 characters']
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'resolved', 'closed'],
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
issueSchema.index({ user: 1, type: 1 });
issueSchema.index({ user: 1, status: 1 });

// Method to get formatted issue type
issueSchema.methods.getFormattedType = function () {
    const types = {
        'cloud-security': 'Cloud Security',
        'reteam-assessment': 'Reteam Assessment',
        'vapt': 'VAPT'
    };
    return types[this.type] || this.type;
};

// Method to convert to JSON
issueSchema.methods.toJSON = function () {
    return {
        id: this._id,
        type: this.type,
        typeFormatted: this.getFormattedType(),
        title: this.title,
        description: this.description,
        priority: this.priority,
        status: this.status,
        user: this.user,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
