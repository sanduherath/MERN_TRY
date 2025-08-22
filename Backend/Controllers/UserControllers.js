const User = require("../Model/UserModel");
const PDFDocument = require("pdfkit");

const getAllUsers = async (req, res, next) => {
  let users; // Consistent variable name
  try {
    users = await User.find();
    // Always return 200 with an array (empty if none). Frontend expects an array;
    // returning 404 caused Axios to throw and the View couldn't render.
    if (!users) users = [];
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
//data insertion
const addUsers = async (req, res, next) => {
  const { name, gmail, age, address } = req.body;
  const user = new User({ name, gmail, age, address });
  try {
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
  //not insert user
  if (!user) {
    return res.status(400).json({ message: "User not created" });
  }
};
//fetch dayta by id
const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
//update user
const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const { name, gmail, age, address } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, gmail, age, address },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
//delete account
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
// Generate a PDF report of all users and stream it back to the client
const generateUsersReport = async (req, res, next) => {
  try {
    const users = (await User.find()) || [];

    // Set response headers for PDF inline display
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="users_report.pdf"');

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    // Pipe PDF stream directly to response
    doc.pipe(res);

    doc.fontSize(18).text("Users Report", { align: "center" });
    doc.moveDown(1);

    if (!users || users.length === 0) {
      doc.fontSize(12).text("No users available.", { align: "left" });
    } else {
      users.forEach((u, idx) => {
        doc.fontSize(12).text(`${idx + 1}. ${u.name || ""}`);
        doc.fontSize(10).text(`   Email: ${u.gmail || ""}`);
        doc.fontSize(10).text(`   Age: ${u.age || ""}`);
        doc.fontSize(10).text(`   Address: ${u.address || ""}`);
        doc.moveDown(0.5);
      });
    }

    doc.end();
    // PDF will be streamed to the client; no further response needed here
  } catch (err) {
    console.error("generateUsersReport error", err);
    return res
      .status(500)
      .json({ message: "Server error generating report", error: err.message });
  }
};

exports.generateUsersReport = generateUsersReport;
