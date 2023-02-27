import dbTasks from '@react-native-async-storage/async-storage';

export const addTask = async (key, value) => {
    try {
        await dbTasks.setItem(`task${key}`, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting task:', error);
    }
};

export const addCategory = async (key, value) => {
    try {
        await dbTasks.setItem(`category${key}`, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting category:', error);
    }
};

export const getTask = async (key) => {
    try {
        const value = await dbTasks.getItem(`task${key}`);
        return value !== null ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting one task:', error);
        return null;
    }
};

export const getCategory = async (key) => {
    try {
        const value = await dbTasks.getItem(`category${key}`);
        return value !== null ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting one category:', error);
        return null;
    }
};

export const removeTask = async (key) => {
    try {
        await dbTasks.removeItem(`task${key}`);
    } catch (error) {
        console.error('Error removing task:', error);
        return null;
    }
}

export const removeCategory = async (key) => {
    try {
        await dbTasks.removeItem(`category${key}`);
    } catch (error) {
        console.error('Error removing category:', error);
        return null;
    }
}

export const getAllTasksKeys = async () => {
    try {
        const value = await dbTasks.getAllKeys();

        let tasksValue = value.filter(v => v.startsWith('task'));

        //console.log("Tasks ", tasksValue)
        return tasksValue !== null ? tasksValue : null;
    } catch (error) {
        console.error('Error getting task:', error);
        return null;
    }
}

export const getAllCategoriesKeys = async () => {
    try {
        const value = await dbTasks.getAllKeys();

        let categoriesValue = value.filter(v => v.startsWith('category'));
        let categoriesValue2 = categoriesValue.filter(v => v.slice(8));

        //console.log("Categories ", categoriesValue2)
        return categoriesValue2 !== null ? categoriesValue2 : null;
    } catch (error) {
        console.error('Error getting categiry:', error);
        return null;
    }
}

export const removeAll = async () => {
    try {
        const tasks = await dbTasks.clear();
        for (task in tasks)
            await removeTask(task);
    } catch (error) {
        console.error('Error removing all tasks:', error);
        return null;
    }
}