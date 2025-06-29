const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.json());

const batimentsRoutes = require('./routes/batiments');
const teamsRoutes = require('./routes/teams');
const employesRoutes = require('./routes/employes');
const projectRoutes = require('./routes/project');
const taskRoutes = require('./routes/task'); 

app.use('/batiment', batimentsRoutes);
app.use('/equipe', teamsRoutes);
app.use('/employe', employesRoutes);
app.use('/project', projectRoutes);
app.use('/task', taskRoutes);

app.use('/spec', express.static(path.join(__dirname, 'pages/spec')));

app.get('/', (req, res) => {
    res.json({
        routes: [
            { method: "GET", path: "/batiment/" },
            { method: "GET", path: "/equipe/" },
            { method: "GET", path: "/employe/" },
            { method: "GET", path: "/project/" },
            { method: "POST", path: "/project/" },
            { method: "GET", path: "/task/" },
            { method: "POST", path: "/task/" },
            { method: "GET", path: "/spec/" }
        ]
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});