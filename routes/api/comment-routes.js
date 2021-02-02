const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');


router.route('/:pizzaId').post(addComment); // adds comment 

router
.route('/:pizzaId/:commentId') // redirects to same endpoint for both methods -> 
.put(addReply) // adds comment reply
.delete(removeComment) // removes comment 

router.route('/:pizzaId/:commentId/:replyId').delete(removeReply); // removes reply 





module.exports = router;