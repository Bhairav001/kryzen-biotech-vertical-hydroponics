// Form.route.js

const express = require("express");

const FormRouter = express.Router();

const upload = require("../middlewares/multerMiddleware");
const { uploadOnCloudinary } = require("../cloudinary");
const { FormModel } = require("../model/Form.model");

//http://localhost:8080/forms/submit
FormRouter.post("/submit", upload.single("photo"), async (req, res) => {
  try {
    // Handle form submission logic here
    const { name, age, address } = req.body;

    // const photoPath = req.file
    const avatarLocalPath = req?.file?.path
    const profilepic= await uploadOnCloudinary(avatarLocalPath)

    console.log("profilePic",profilepic)
    upload.fields([
        {
            name: "photo",
            maxCount: 1
        }
    ])

    const user = new FormModel({
        name,
        age,
        address,
        photo: profilepic.url || "",
    }) 
 await user.save()
    res.send(user);
    console.log("user",user)

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//http://localhost:8080/forms
FormRouter.get("/", async (req, res) => {
  const payload = req.body;
  try {
    const forms = await FormModel.find(payload);
    const formattedForms = forms.map((form) => ({
      name: form.name,
      age: form.age,
      address: form.address,
      photo: form.photo,
    }));
    res.send(formattedForms);
  } catch (error) {
    console.error({ msg: "not getting data", error: error.message });
    res.status(500).send({ error: "Internal Server Error" });
  }
});


module.exports = {
  FormRouter,
};
