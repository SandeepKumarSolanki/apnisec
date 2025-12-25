const express = require('express');
const IssueHandler = require('../handlers/IssueHandler');
const { authMiddleware } = require('../middlewares');

const router = express.Router();
const issueHandler = new IssueHandler();

// All routes are protected
router.use(authMiddleware);

router.get('/', issueHandler.getAll);
router.post('/', issueHandler.create);
router.get('/:id', issueHandler.getOne);
router.put('/:id', issueHandler.update);
router.delete('/:id', issueHandler.delete);

module.exports = router;
