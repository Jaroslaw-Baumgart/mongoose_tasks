
import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/mongoosetest";
mongoose.connect(url);

const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 256
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 10240
    },
    status: {
        type: String,
        required: true,
        enum: ["Not started", "In progress", "On hold", "Completed"],
        default: "Not started"
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model("Task", taskSchema);


function makeTask(title, description) {
    return new Task({
        _id: new mongoose.Types.ObjectId(),
        title,
        description
    });
}

/*const tasksArr = [
    makeTask("Task #1", "Something to do #1"),
    makeTask("Task #2", "Something to do #2"),
    makeTask("Task #3", "Something to do #3"),
    makeTask("Task #4", "Something to do #4"),
    makeTask("Task #5", "Something to do #5")
];
*/

const tasksArr = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Write README file",
    description: "Create a comprehensive README.md for the project.",
    status: "Completed"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Implement Task Controller",
    description: "Add business logic for handling task API routes.",
    status: "In progress"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Style the task list",
    description: "Add basic CSS for the frontend UI.",
    status: "On hold"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Connect MongoDB",
    description: "Establish a working connection to the local MongoDB server.",
    status: "Completed"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Set up routing",
    description: "Implement route handling for static files and API.",
    status: "Not started"
  }
];


try {
    await Task.deleteMany({});
    const taskDb = await Task.find({});
    console.log("Num tasks in db: ", taskDb.length);

    if (taskDb.length === 0) {
        await Task.insertMany(tasksArr).then(
            (result) => {
                console.log("Tasks saved, num: ", result.length);
            }
          ).catch(
            (err) => {
                console.log("Error saving task to db", err);
            }
          )
    }

    

} catch(err) {
    console.log("Error: ", err.message);
}

export async function getAll() {
    return await Task.find();
}

export async function getById(_id) {
    return await Task.find({ _id });
}

export async function deleteById(_id) {
    return await Task.deleteById({ _id });
}