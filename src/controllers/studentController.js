const studentCreateController = async (req, res) => {
  try {
    console.log("Student create controller req.body......",req.body)
    const newStudent = await createNewStudent(req.body);

    if (newStudent.success) {
        return res.status(201).json({
            success: true,
        message: "New Student Created successful..",
        data: newStudent,
        })
        
    }else{
        // newStudent.success is false, handle according to newStudent.statusCode
      return res
      .status(newStudent.statusCode || 400)
      .json({ message: newStudent.message });
    }
  } catch (error) {
    console.error("New Student Creation controller error:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
