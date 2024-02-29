const Task = require('../models/tasks.model')
const { CustomError } = require('../middlewares/errorHandler.middleware')

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, category } = req.body
    const userId = req.user.userId

    if (!title || !description) {
      throw new CustomError('Title and description are required fields.', 400)
    }

    const newTask = new Task({ title, description, dueDate, category })
    await newTask.save()

    res.status(201).json({
      message: 'Task created successfully',
      success: true,
      data: newTask,
    })
  } catch (error) {
    next(new CustomError('An error occurred while creating the task!', 500))
  }
}

exports.getTasks = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const tasks = await Task.find({ userId })

    res.json(tasks)
  } catch (error) {
    next(new CustomError('An error occurred while fetching the tasks!', 500))
  }
}

exports.markTaskAsCompleted = async (req, res, next) => {
  try {
    const taskId = req.params.id
    const userId = req.user.userId

    const task = await Task.findOne({ _id: taskId, userId })

    if (!task) {
      throw new CustomError('Task not found', 404)
    }

    if (task.completed) {
      return res.json({ message: 'Task is already completed' })
    }

    task.completed = true
    await task.save()

    res.json({ message: 'Task marked as completed', data: task })
  } catch (error) {
    next(new CustomError('An error occurred while fetching the task!', 500))
  }
}

exports.editTask = async (req, res, next) => {
  try {
    const taskId = req.params.id
    const { title, description, dueDate, category } = req.body
    const userId = req.user.userId

    const task = await Task.findOne({ _id: taskId, userId })

    if (!task) {
      throw new CustomError('Task not found', 404)
    }

    if (title) {
      task.title = title
    }
    if (description) {
      task.description = description
    }
    if (dueDate) {
      task.dueDate = dueDate
    }
    if (category) {
      task.category = category
    }

    await task.save()

    res.json({ message: 'Task edited successfully', success: true, data: task })
  } catch (error) {
    next(new CustomError('An error occurred while editing the task!', 500))
  }
}

exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id
    const userId = req.user.userId

    const task = await Task.findOne({ _id: taskId, userId })

    if (!task) {
      throw new CustomError('Task not found', 404)
    }

    await task.deleteOne()

    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    next(new CustomError('An error occurred while deleting the task!', 500))
  }
}

exports.getTaskByTitleName = async (req, res, next) => {
  try {
    const title = req.params.title

    const task = await Task.findOne({ title })

    if (!task) {
      throw new CustomError('Task not found not this title', 404)
    }

    res.status(200).json({ data: task, success: true })
  } catch (error) {
    next(new CustomError('An error occurred while fetching the task!', 500))
  }
}

exports.getByCategory = async (req, res) => {
  try {
    const category = req.params.category

    const tasks = await Task.find({ category })

    if (!tasks || tasks.length === 0) {
      throw new CustomError('Task not found for this category', 404)
    }

    res.json(tasks)
  } catch (error) {
    next(new CustomError('An error occurred while fetching the task!', 500))
  }
}
