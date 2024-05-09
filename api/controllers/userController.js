export const userController = (req, res) => {
  try {
    res.send({ success: true, message: "Welcome kuttay" });
  } catch (error) {
    console.log(error);
  }
};
