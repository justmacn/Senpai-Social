const router = require("express").Router();

// import any models you plan to use for this data's routes here
const { ExampleData } = require("../../models");

// protects routes from non-logged in users
const { apiGuard } = require("../../utils/authGuard");

router.post("/", apiGuard, async (req, res) => {
  try {
    const newExampleData = await ExampleData.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newExampleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", apiGuard, async (req, res) => {
  try {
    const [updatedRows] = await ExampleData.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", apiGuard, async (req, res) => {
  try {
    const [destroyedRows] = ExampleData.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (destroyedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
