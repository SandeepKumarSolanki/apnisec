const BaseHandler = require('./BaseHandler');
const IssueService = require('../services/IssueService');
const { IssueValidator } = require('../validators');
const { ValidationError } = require('../errors');

/**
 * Issue Handler Class
 * Handles issue-related requests
 */
class IssueHandler extends BaseHandler {
    constructor() {
        super();
        this.issueService = new IssueService();
        this.validator = new IssueValidator();
    }

    /**
     * Get all issues for user
     * GET /api/issues
     * Query params: type, status, sort, order
     */
    getAll = this.asyncHandler(async (req, res) => {
        const { type, status, sort, order } = req.query;

        // Validate filter type if provided
        if (type) {
            const validation = this.validator.validateFilterType(type);
            if (!validation.isValid) {
                throw new ValidationError('Invalid filter', validation.errors);
            }
        }

        const filters = { type, status, sort, order };
        const issues = await this.issueService.getAllForUser(req.user.id, filters);
        const stats = await this.issueService.getStatsForUser(req.user.id);

        return this.success(res, { issues, stats }, 'Issues retrieved successfully');
    });

    /**
     * Get single issue
     * GET /api/issues/:id
     */
    getOne = this.asyncHandler(async (req, res) => {
        const { id } = req.params;

        // Validate ID
        const validation = this.validator.validateId(id);
        if (!validation.isValid) {
            throw new ValidationError('Invalid ID', validation.errors);
        }

        const issue = await this.issueService.getOneForUser(id, req.user.id);
        return this.success(res, { issue }, 'Issue retrieved successfully');
    });

    /**
     * Create new issue
     * POST /api/issues
     */
    create = this.asyncHandler(async (req, res) => {
        // Validate input
        const validation = this.validator.validateCreate(req.body);
        if (!validation.isValid) {
            throw new ValidationError('Validation failed', validation.errors);
        }

        const issueData = {
            type: req.body.type,
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority || 'medium',
            status: req.body.status || 'open'
        };

        const issue = await this.issueService.createForUser(req.user.id, issueData);
        return this.created(res, { issue }, 'Issue created successfully');
    });

    /**
     * Update issue
     * PUT /api/issues/:id
     */
    update = this.asyncHandler(async (req, res) => {
        const { id } = req.params;

        // Validate ID
        let validation = this.validator.validateId(id);
        if (!validation.isValid) {
            throw new ValidationError('Invalid ID', validation.errors);
        }

        // Validate update data
        validation = this.validator.validateUpdate(req.body);
        if (!validation.isValid) {
            throw new ValidationError('Validation failed', validation.errors);
        }

        const updateData = {};
        if (req.body.type) updateData.type = req.body.type;
        if (req.body.title) updateData.title = req.body.title;
        if (req.body.description) updateData.description = req.body.description;
        if (req.body.priority) updateData.priority = req.body.priority;
        if (req.body.status) updateData.status = req.body.status;

        const issue = await this.issueService.updateForUser(id, req.user.id, updateData);
        return this.success(res, { issue }, 'Issue updated successfully');
    });

    /**
     * Delete issue
     * DELETE /api/issues/:id
     */
    delete = this.asyncHandler(async (req, res) => {
        const { id } = req.params;

        // Validate ID
        const validation = this.validator.validateId(id);
        if (!validation.isValid) {
            throw new ValidationError('Invalid ID', validation.errors);
        }

        await this.issueService.deleteForUser(id, req.user.id);
        return this.success(res, null, 'Issue deleted successfully');
    });
}

module.exports = IssueHandler;
