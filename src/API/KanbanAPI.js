const {readFile, writeFileSync} = require('fs');

/* export default class Kanban {
    static getProjectList() {
        const projects = [];

        const data = read();
        console.log(data);
        data.forEach(project => {
            projects.push(project.name);
        });

        if (!projects) {
            return [];
        }

        return projects;
    }

    static getProject(id) {
        const project = read().find(project => project.id === id);

        if (!project) {
            return [];
        }

        return project;
    }

    static addTask(projectId, task) {
        const data = read()
        const project = data.find(project => project.id === projectId)
        project.tasks.push(task);
        commit(data);
    }
} */

// At the beginning of starting the project, load project data into localstorage
function init() {
    console.log("Starting")
    let content = "[]";
    readFile('data', 'utf-8', (err, result) => {
        if (err) {
            writeFileSync('./data.json', '[]', (err) => {
                console.log('Failed to create file');
                return;
            })
            return;
        }
        content = JSON.parse(result);
        save(content);
    })
}

// Read from localStorage;
function read() {
    const json = localStorage.getItem("data");

    if (!json) {
        return [
            {
                id: 1,
                items: [],
            }, 
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            }
        ];
    }

    return JSON.parse(json);
}

// Save data to localStorage
function save(data) {
    localStorage.setItem("data", JSON.stringify(data));
}

module.exports = {init};