const express = require("express");
const router = express.Router();
const FoodModel = require("../model/food");

router.get("/test", (req, res) => {
  res.send("Food route is working");
});
// User registration
router.post('/register', async (req, res) => {
  try {
    const { code, name, level, countryCode, note,imageUrl,isActive,isSpicy,isHotelFood } = req.body;
    // Create a new user if no duplicates found
    const food = new FoodModel({ code, name, level, countryCode, note,imageUrl,isActive,isSpicy,isHotelFood });
    await food.save();
    res.json({ message: 'Food created successfully' ,data:food});
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Registration failed' });
  }
});

// User registration
router.get("/list", async (req, res) => {
  try {
    FoodModel
      .find()
      .sort({ createAt: 1  }) // Sort by createdAt in descending order
      .exec(function (err, data) {
        if (err) {
          console.log(err);
          res.status(500).send({ status: false, message: "An error occurred" });
        } else {
          if (data == null || data.length == 0) {
            res.json({
              status: false,
              message: "find list foods fail",
              totalResult: null,
              data: data,
            });
          } else {
            res.json({
              status: true,
              message: "find list food success",
              totalResult: data.length,
              data: data,
            });
          }
        }
      });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});



// User registration
router.get("/list/paging", async (req, res) => {
    try {
      const { start = 0, limit = 10 } = req.query;

      console.log(`Fetching foods with start: ${start} and limit: ${limit}`);

      const data = await FoodModel
      .find()
      .sort({ name: 1 }) // Sort by createdAt in descending order
      .skip(parseInt(start))
      .limit(parseInt(limit))
      .exec();
      if (data.length === 0) {
        return res.status(200).json({
          status: false,
          message: "find list food fail",
          totalResult: null,
          data: data,
        });
      } else {
          return res.json({
            status: true,
            message: "find food success",
            totalResult: data.length,
            data: data,
          });

      }
  } catch (error) {
      console.error("Error occurred while fetching data:", error);
      res.status(500).json({ status: false, message: "An error occurred" });
  }
});


// Update staff by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, level, countryCode, note,imageUrl,isActive,isSpicy,isHotelFood } = req.body;
    const updateFields = {};
    if (code !== undefined) updateFields.code = code;
    if (name !== undefined) updateFields.name = name;
    if (level !== undefined) updateFields.level = level;
    if (countryCode !== undefined) updateFields.countryCode = countryCode;
    if (note !== undefined) updateFields.note = note;
    if (imageUrl !== undefined) updateFields.imageUrl = imageUrl;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (isSpicy !== undefined) updateFields.isSpicy = isSpicy;
    if (isHotelFood !== undefined) updateFields.isHotelFood = isHotelFood;
    const updateFood = await FoodModel.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updateFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({ message: 'Food item updated successfully', data: updateFood });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Update failed' });
  }
});

// Update staff image_url by ID
router.put('/update_image/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url } = req.body;
    if (!image_url) {
      return res.status(400).json({ message: 'image_url is required' });
    }
    const updatedFood = await FoodModel.findByIdAndUpdate(
      id,
      { image_url },
      { new: true }
    );
    if (!updatedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({ message: 'Food image_url updated successfully', data: updatedFood });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Update failed' });
  }
});


// User delete by _id
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // Check if the user exists
    const existingUser = await FoodModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "Food not found" });
    }
    // Delete the user
    await existingUser.remove();
    res.status(200).json({ status: true, message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
