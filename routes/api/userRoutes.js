const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require ('../../controllers/userController');

router.route("/api/users").get(getUsers).post(createUser);

router
  .route("/api/users/:userId")
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;