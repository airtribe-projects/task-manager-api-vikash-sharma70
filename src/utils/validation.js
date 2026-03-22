const isEmpty = (value) => {
    return !value || value.trim() === ""
}

const validPriorities = ["low", "medium", "high"]

const validateTaskInput = (data, isUpdate = false) => {
    const { title, description, completed, priority } = data;

    if (!isUpdate) {
        if (isEmpty(title) || isEmpty(description)) {
            return "Title and description are required and cannot be empty"
        }
    }

    if (title !== undefined && isEmpty(title)) {
        return "Title cannot be empty"
    }

    if (description !== undefined && isEmpty(description)) {
        return "Description cannot be empty"
    }

    if (completed !== undefined && typeof completed !== "boolean") {
        return "Completed must be a boolean value"
    }

    if (priority !== undefined && !validPriorities.includes(priority)) {
        return "Priority must be low, medium, or high"
    }

    return null
}

module.exports = {
    validateTaskInput
}