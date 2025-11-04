# TaskMate

A lightweight, extensible task management app for creating, editing, deleting, searching and sorting tasks with simple local persistence and optional sync adapters.



## Key features
- Create, edit and delete tasks (title, description, date created)
- Live task counter badge 
- Search  tasks (text)
- Drag-and-drop reordering using SortableJS (client-side order persisted)
- Simple local storage persistence (localStorage)
- Preferred settings and user presets (delete confirmation, UI feedback sound, Haptic sound and more.)


## Quick start

Prerequisites
- Node.js >= 16
- npm or yarn

Install
```bash
git clone https://github.com/your-org/taskmate.git
cd taskmate
npm install
# or
yarn
```

Environment
```bash
cp .env.example .env
# edit .env (PORT, DATABASE_URL, STORAGE=local|sqlite|file, etc.)
```

Run (development)
```bash
npm run dev
# or
yarn dev
```

Build (production)
```bash
npm run build
npm start
```

## Web UI snippets

Basic localStorage task persistence (frontend)
```js
// tasks are an array of { id, title, date created, completed }
const KEY = 'taskmate:tasks';

function loadTasks() {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
}

function saveTasks(tasks) {
    localStorage.setItem(KEY, JSON.stringify(tasks));
}
```

Drag-and-drop with SortableJS (persist order)
```html
<!-- include Sortable -->
<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
<ul id="task-list"></ul>
<script>
const list = document.getElementById('task-list');
Sortable.create(list, {
    animation: 150,
    onEnd: () => {
        // reorder DOM -> update tasks[].order and persist
        const newOrder = Array.from(list.children).map(li => li.dataset.id);
        const tasks = loadTasks();
        // update tasks by matching ids, then save
        tasks.sort((a,b) => newOrder.indexOf(String(a.id)) - newOrder.indexOf(String(b.id)));
        saveTasks(tasks);
    }
});
</script>
```



## Storage adapters
- localStorage (browser) — simple, zero config
- File (JSON) — good for single-user desktop apps
- SQLite — recommended for local multi-user or larger data sets
- Postgres/MySQL — for server deployments, configurable via DATABASE_URL


## Development
- Tests: npm test
- Lint: npm run lint
- Format: npm run format
- Follow code style in .eslintrc and .prettierrc

## Contributing
- Fork, branch, PR
- Include tests for new features/bugs
- Keep commits focused; follow conventional commits if enabled

## License
MIT — see LICENSE for details.

## Contact
Repository: https://github.com/knowingEyes/TaskMate.git
Issues: use the GitHub Issues tab

Customize this README to match your project's exact commands, build steps and configuration.