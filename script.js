// let graph = {};
// let edges = [];

// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('startButton').addEventListener('click', () => {
//         document.getElementById('page1').style.display = 'none';
//         document.getElementById('page2').style.display = 'flex';
//     });

//     document.getElementById('quitButton').addEventListener('click', () => {
//         window.close();
//     });

//     document.getElementById('addNode').addEventListener('click', () => {
//         const node = document.getElementById('node').value;
//         const neighbor = document.getElementById('neighbor').value;
//         const cost = parseFloat(document.getElementById('cost').value);
//         const density = parseFloat(document.getElementById('density').value);

//         if (!node || !neighbor || isNaN(cost) || isNaN(density)) {
//             alert('Incomplete input. Please fill in all fields.');
//             return;
//         }

//         // Check if the route already exists
//         if (graph[node] && graph[node].some(edge => edge.node === neighbor)) {
//             alert('Rute antar Node ini sudah ada!');
//             return;
//         }

//         if (!graph[node]) {
//             graph[node] = [];
//         }
//         if (!graph[neighbor]) {
//             graph[neighbor] = [];
//         }
//         graph[node].push({ node: neighbor, cost: cost, density: density });
//         graph[neighbor].push({ node: node, cost: cost, density: density });

//         edges.push({ source: node, target: neighbor, cost: cost, density: density });

//         document.getElementById('node').value = '';
//         document.getElementById('neighbor').value = '';
//         document.getElementById('cost').value = '';
//         document.getElementById('density').value = '';

//         drawGraph();
//     });

//     document.getElementById('runGreedy').addEventListener('click', runGreedy);
//     document.getElementById('runBruteForce').addEventListener('click', runBruteForce);
//     document.getElementById('deleteNode').addEventListener('click', deleteNode);
//     document.getElementById('editNode').addEventListener('click', editNode);
//     document.getElementById('exitButton').addEventListener('click', () => {
//         window.close();
//     });
// });

// function drawGraph() {
//     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svg.setAttribute("width", 600);
//     svg.setAttribute("height", 400);
//     document.getElementById("graph").innerHTML = '';
//     document.getElementById("graph").appendChild(svg);

//     const nodes = Object.keys(graph);
//     const positions = {};
//     nodes.forEach((node, index) => {
//         positions[node] = getNodeCoordinate(node, index, nodes.length);
//     });

//     edges.forEach(edge => {
//         const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
//         line.setAttribute("x1", positions[edge.source].x);
//         line.setAttribute("y1", positions[edge.source].y);
//         line.setAttribute("x2", positions[edge.target].x);
//         line.setAttribute("y2", positions[edge.target].y);
//         line.setAttribute("stroke", "#999");
//         line.setAttribute("stroke-width", 2);
//         line.setAttribute("data-source", edge.source);
//         line.setAttribute("data-target", edge.target);
//         svg.appendChild(line);

//         const costText = document.createElementNS("http://www.w3.org/2000/svg", "text");
//         const midX = (positions[edge.source].x + positions[edge.target].x) / 2;
//         const midY = (positions[edge.source].y + positions[edge.target].y) / 2 - 5;
//         costText.setAttribute("x", midX);
//         costText.setAttribute("y", midY);
//         costText.setAttribute("fill", "red");
//         costText.textContent = edge.cost;
//         svg.appendChild(costText);
//     });

//     nodes.forEach(node => {
//         const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//         const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
//         const coord = positions[node];

//         circle.setAttribute("cx", coord.x);
//         circle.setAttribute("cy", coord.y);
//         circle.setAttribute("r", 10);
//         circle.setAttribute("fill", "blue");
//         circle.setAttribute("data-node", node);

//         text.setAttribute("x", coord.x + 12);
//         text.setAttribute("y", coord.y + 3);
//         text.textContent = node;

//         svg.appendChild(circle);
//         svg.appendChild(text);
//     });

//     document.getElementById('pathfinding-controls').style.display = 'block';
// }

// function getNodeCoordinate(node, index, totalNodes) {
//     const angle = (index / totalNodes) * 2 * Math.PI;
//     const radius = 150;
//     const centerX = 300;
//     const centerY = 200;

//     return {
//         x: centerX + radius * Math.cos(angle),
//         y: centerY + radius * Math.sin(angle)
//     };
// }

// async function runGreedy() {
//     const start = document.getElementById('start').value;
//     const finish = document.getElementById('finish').value;
//     const bensin_awal = parseInt(document.getElementById('bensin_awal').value);

//     const result = await greedyHematBensinWithDensity(graph, start, finish, bensin_awal);

//     document.getElementById('result').innerHTML = `Greedy Path: ${result.path} <br> Remaining Fuel: ${result.remainingFuel}`;
//     visualizePath(result.path);
// }

// async function runBruteForce() {
//     const start = document.getElementById('start').value;
//     const finish = document.getElementById('finish').value;
//     const bensin_awal = parseInt(document.getElementById('bensin_awal').value);

//     const result = await bruteForceHematBensinWithDensity(graph, start, finish, bensin_awal);

//     document.getElementById('result').innerHTML = `Brute Force Path: ${result.path} <br> Remaining Fuel: ${result.remainingFuel}`;
//     visualizePath(result.path);
// }

// async function greedyHematBensinWithDensity(graph, start, finish, bensin) {
//     let current_node = start;
//     let sisa_bensin = bensin;
//     let path = [start];

//     while (current_node !== finish) {
//         let min_biaya_bensin = Infinity;
//         let next_node = null;

//         for (let { node, cost, density } of graph[current_node]) {
//             let effective_biaya_bensin = cost * (1 + density);
//             if (effective_biaya_bensin < min_biaya_bensin && !path.includes(node)) {
//                 min_biaya_bensin = effective_biaya_bensin;
//                 next_node = node;
//             }
//         }

//         if (next_node === null || sisa_bensin < min_biaya_bensin) {
//             return { path: null, remainingFuel: 0 };
//         }

//         path.push(next_node);
//         sisa_bensin -= min_biaya_bensin;
//         current_node = next_node;

//         await delay(500); // Delay for visualization
//         visualizePathStep(path);
//     }

//     return { path: path, remainingFuel: sisa_bensin };
// }

// async function bruteForceHematBensinWithDensity(graph, start, finish, bensin) {
//     async function dfs(current_node, target, remaining_fuel, path, total_fuel) {
//         if (remaining_fuel < 0) {
//             return { path: null, fuelUsed: Infinity };
//         }

//         if (current_node === target) {
//             return { path: path, fuelUsed: total_fuel };
//         }

//         let best_path = null;
//         let min_fuel_used = Infinity;

//         for (let { node, cost, density } of graph[current_node]) {
//             if (!path.includes(node)) {
//                 let effective_biaya_bensin = cost * (1 + density);
//                 let result = await dfs(node, target, remaining_fuel - effective_biaya_bensin, path.concat(node), total_fuel + effective_biaya_bensin);
//                 if (result.fuelUsed < min_fuel_used) {
//                     best_path = result.path;
//                     min_fuel_used = result.fuelUsed;
//                 }

//                 await delay(500); // Delay for visualization
//                 visualizePathStep(path.concat(node));
//             }
//         }

//         return { path: best_path, fuelUsed: min_fuel_used };
//     }

//     let result = await dfs(start, finish, bensin, [start], 0);

//     if (result.path === null) {
//         return { path: null, remainingFuel: 0 };
//     }

//     return { path: result.path, remainingFuel: bensin - result.fuelUsed };
// }

// function visualizePath(path) {
//     const svg = document.querySelector('svg');
//     if (!svg) return;

//     // Reset all nodes and edges to their original colors
//     const circles = svg.querySelectorAll('circle');
//     circles.forEach(circle => circle.setAttribute('fill', 'blue'));
//     const lines = svg.querySelectorAll('line');
//     lines.forEach(line => line.setAttribute('stroke', '#999'));

//     for (let i = 0; i < path.length - 1; i++) {
//         const current_node = path[i];
//         const next_node = path[i + 1];

//         const edge = svg.querySelector(`line[data-source="${current_node}"][data-target="${next_node}"], line[data-source="${next_node}"][data-target="${current_node}"]`);
//         if (edge) {
//             edge.setAttribute('stroke', 'green');
//         }

//         const node = svg.querySelector(`circle[data-node="${current_node}"]`);
//         if (node) {
//             node.setAttribute('fill', 'green');
//         }
//     }

//     // Color the final node
//     const final_node = svg.querySelector(`circle[data-node="${path[path.length - 1]}"]`);
//     if (final_node) {
//         final_node.setAttribute('fill', 'green');
//     }
// }

// function visualizePathStep(path) {
//     const svg = document.querySelector('svg');
//     if (!svg) return;

//     for (let i = 0; i < path.length - 1; i++) {
//         const current_node = path[i];
//         const next_node = path[i + 1];

//         const edge = svg.querySelector(`line[data-source="${current_node}"][data-target="${next_node}"], line[data-source="${next_node}"][data-target="${current_node}"]`);
//         if (edge) {
//             edge.setAttribute('stroke', 'orange');
//         }

//         const node = svg.querySelector(`circle[data-node="${current_node}"]`);
//         if (node) {
//             node.setAttribute('fill', 'orange');
//         }
//     }

//     // Color the final node
//     const final_node = svg.querySelector(`circle[data-node="${path[path.length - 1]}"]`);
//     if (final_node) {
//         final_node.setAttribute('fill', 'orange');
//     }
// }

// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// function deleteNode() {
//     const node = document.getElementById('delete-node').value;

//     if (!graph[node]) {
//         alert('Node does not exist.');
//         return;
//     }

//     delete graph[node];
//     edges = edges.filter(edge => edge.source !== node && edge.target !== node);

//     for (let key in graph) {
//         graph[key] = graph[key].filter(edge => edge.node !== node);
//     }

//     drawGraph();
// }

// function editNode() {
//     const node = document.getElementById('edit-node').value;
//     const neighbor = document.getElementById('edit-neighbor').value;
//     const newCost = parseFloat(document.getElementById('new-cost').value);
//     const newDensity = parseFloat(document.getElementById('new-density').value);

//     if (!graph[node] || !graph[node].some(edge => edge.node === neighbor)) {
//         alert('Route does not exist.');
//         return;
//     }

//     graph[node] = graph[node].map(edge => {
//         if (edge.node === neighbor) {
//             return { node: edge.node, cost: newCost, density: newDensity };
//         }
//         return edge;
//     });

//     graph[neighbor] = graph[neighbor].map(edge => {
//         if (edge.node === node) {
//             return { node: edge.node, cost: newCost, density: newDensity };
//         }
//         return edge;
//     });

//     edges = edges.map(edge => {
//         if ((edge.source === node && edge.target === neighbor) || (edge.source === neighbor && edge.target === node)) {
//             return { source: edge.source, target: edge.target, cost: newCost, density: newDensity };
//         }
//         return edge;
//     });

//     drawGraph();
// }


// testing
let graph = {};
let edges = [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startButton').addEventListener('click', () => {
        document.getElementById('page1').style.display = 'none';
        document.getElementById('page2').style.display = 'flex';
    });

    document.getElementById('quitButton').addEventListener('click', () => {
        window.close();
    });

    document.getElementById('addNode').addEventListener('click', () => {
        const node = document.getElementById('node').value;
        const neighbor = document.getElementById('neighbor').value;
        const cost = parseFloat(document.getElementById('cost').value);
        const density = parseFloat(document.getElementById('density').value);

        if (!node || !neighbor || isNaN(cost) || isNaN(density)) {
            alert('Incomplete input. Please fill in all fields.');
            return;
        }

        // Check if the route already exists
        if (graph[node] && graph[node].some(edge => edge.node === neighbor)) {
            alert('Rute antar Node ini sudah ada!');
            return;
        }

        if (!graph[node]) {
            graph[node] = [];
        }
        if (!graph[neighbor]) {
            graph[neighbor] = [];
        }
        
        const effectiveCost = cost * (1 + density);

        graph[node].push({ node: neighbor, cost: effectiveCost });
        graph[neighbor].push({ node: node, cost: effectiveCost });

        edges.push({ source: node, target: neighbor, cost: effectiveCost });

        document.getElementById('node').value = '';
        document.getElementById('neighbor').value = '';
        document.getElementById('cost').value = '';
        document.getElementById('density').value = '';

        drawGraph();
    });

    document.getElementById('runGreedy').addEventListener('click', runGreedy);
    document.getElementById('runBruteForce').addEventListener('click', runBruteForce);
    document.getElementById('deleteNode').addEventListener('click', deleteNode);
    document.getElementById('editNode').addEventListener('click', editNode);
    document.getElementById('exitButton').addEventListener('click', () => {
        window.close();
    });
});

function drawGraph() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", 600);
    svg.setAttribute("height", 400);
    document.getElementById("graph").innerHTML = '';
    document.getElementById("graph").appendChild(svg);

    const nodes = Object.keys(graph);
    const positions = {};
    nodes.forEach((node, index) => {
        positions[node] = getNodeCoordinate(node, index, nodes.length);
    });

    edges.forEach(edge => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", positions[edge.source].x);
        line.setAttribute("y1", positions[edge.source].y);
        line.setAttribute("x2", positions[edge.target].x);
        line.setAttribute("y2", positions[edge.target].y);
        line.setAttribute("stroke", "#999");
        line.setAttribute("stroke-width", 2);
        line.setAttribute("data-source", edge.source);
        line.setAttribute("data-target", edge.target);
        svg.appendChild(line);

        const costText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const midX = (positions[edge.source].x + positions[edge.target].x) / 2;
        const midY = (positions[edge.source].y + positions[edge.target].y) / 2 - 5;
        costText.setAttribute("x", midX);
        costText.setAttribute("y", midY);
        costText.setAttribute("fill", "red");
        costText.textContent = edge.cost.toFixed(2);
        svg.appendChild(costText);
    });

    nodes.forEach(node => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const coord = positions[node];

        circle.setAttribute("cx", coord.x);
        circle.setAttribute("cy", coord.y);
        circle.setAttribute("r", 10);
        circle.setAttribute("fill", "blue");
        circle.setAttribute("data-node", node);

        text.setAttribute("x", coord.x + 12);
        text.setAttribute("y", coord.y + 3);
        text.textContent = node;

        svg.appendChild(circle);
        svg.appendChild(text);
    });

    document.getElementById('pathfinding-controls').style.display = 'block';
}

function getNodeCoordinate(node, index, totalNodes) {
    const angle = (index / totalNodes) * 2 * Math.PI;
    const radius = 150;
    const centerX = 300;
    const centerY = 200;

    return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
    };
}

async function runGreedy() {
    const start = document.getElementById('start').value;
    const finish = document.getElementById('finish').value;
    const bensin_awal = parseInt(document.getElementById('bensin_awal').value);

    const result = await greedyHematBensinWithDensity(graph, start, finish, bensin_awal);

    document.getElementById('result').innerHTML = `Greedy Path: ${result.path} <br> Sisa Bensin: ${result.remainingFuel} <br> Bensin yang Terpakai: ${result.fuelUsed}`;
    visualizePath(result.path);
}

async function runBruteForce() {
    const start = document.getElementById('start').value;
    const finish = document.getElementById('finish').value;
    const bensin_awal = parseInt(document.getElementById('bensin_awal').value);

    const result = await bruteForceHematBensinWithDensity(graph, start, finish, bensin_awal);

    document.getElementById('result').innerHTML = `Brute Force Path: ${result.path} <br> Sisa Bensin: ${result.remainingFuel} <br> Bensin yang terpakai: ${result.fuelUsed}`;
    visualizePath(result.path);
}

async function greedyHematBensinWithDensity(graph, start, finish, bensin) {
    let current_node = start;
    let sisa_bensin = bensin;
    let total_fuel_used = 0;
    let path = [start];

    while (current_node !== finish) {
        let min_biaya_bensin = Infinity;
        let next_node = null;

        for (let { node, cost } of graph[current_node]) {
            if (cost < min_biaya_bensin && !path.includes(node)) {
                min_biaya_bensin = cost;
                next_node = node;
            }
        }

        if (next_node === null || sisa_bensin < min_biaya_bensin) {
            return { path: null, remainingFuel: 0, fuelUsed: total_fuel_used };
        }

        path.push(next_node);
        sisa_bensin -= min_biaya_bensin;
        total_fuel_used += min_biaya_bensin;
        current_node = next_node;

        await delay(500); // Delay for visualization
        visualizePathStep(path);
    }

    return { path: path, remainingFuel: sisa_bensin, fuelUsed: total_fuel_used };
}

async function bruteForceHematBensinWithDensity(graph, start, finish, bensin) {
    async function dfs(current_node, target, remaining_fuel, path, total_fuel) {
        if (remaining_fuel < 0) {
            return { path: null, fuelUsed: Infinity };
        }

        if (current_node === target) {
            return { path: path, fuelUsed: total_fuel };
        }

        let best_path = null;
        let min_fuel_used = Infinity;

        for (let { node, cost } of graph[current_node]) {
            if (!path.includes(node)) {
                let result = await dfs(node, target, remaining_fuel - cost, path.concat(node), total_fuel + cost);
                if (result.fuelUsed < min_fuel_used) {
                    best_path = result.path;
                    min_fuel_used = result.fuelUsed;
                }

                await delay(500); // Delay for visualization
                visualizePathStep(path.concat(node));
            }
        }

        return { path: best_path, fuelUsed: min_fuel_used };
    }

    let result = await dfs(start, finish, bensin, [start], 0);

    if (result.path === null) {
        return { path: null, remainingFuel: 0, fuelUsed: bensin };
    }

    return { path: result.path, remainingFuel: bensin - result.fuelUsed, fuelUsed: result.fuelUsed };
}

function visualizePath(path) {
    const svg = document.querySelector('svg');
    if (!svg) return;

    // Reset all nodes and edges to their original colors
    const circles = svg.querySelectorAll('circle');
    circles.forEach(circle => circle.setAttribute('fill', 'blue'));
    const lines = svg.querySelectorAll('line');
    lines.forEach(line => line.setAttribute('stroke', '#999'));

    // Highlight the nodes and edges in the path
    for (let i = 0; i < path.length - 1; i++) {
        const currentNode = path[i];
        const nextNode = path[i + 1];

        // Highlight the edge
        const edge = svg.querySelector(`line[data-source="${currentNode}"][data-target="${nextNode}"], line[data-source="${nextNode}"][data-target="${currentNode}"]`);
        if (edge) {
            edge.setAttribute('stroke', 'green');
        }

        // Highlight the node
        const node = svg.querySelector(`circle[data-node="${currentNode}"]`);
        if (node) {
            node.setAttribute('fill', 'green');
        }
    }

    // Highlight the last node
    const lastNode = svg.querySelector(`circle[data-node="${path[path.length - 1]}"]`);
    if (lastNode) {
        lastNode.setAttribute('fill', 'green');
    }
}

function visualizePathStep(path) {
    const svg = document.querySelector('svg');
    if (!svg) return;

    // Reset all nodes and edges to their original colors
    const circles = svg.querySelectorAll('circle');
    circles.forEach(circle => circle.setAttribute('fill', 'blue'));
    const lines = svg.querySelectorAll('line');
    lines.forEach(line => line.setAttribute('stroke', '#999'));

    // Highlight the nodes and edges in the current step of the path
    for (let i = 0; i < path.length - 1; i++) {
        const currentNode = path[i];
        const nextNode = path[i + 1];

        // Highlight the edge
        const edge = svg.querySelector(`line[data-source="${currentNode}"][data-target="${nextNode}"], line[data-source="${nextNode}"][data-target="${currentNode}"]`);
        if (edge) {
            edge.setAttribute('stroke', 'green');
        }

        // Highlight the node
        const node = svg.querySelector(`circle[data-node="${currentNode}"]`);
        if (node) {
            node.setAttribute('fill', 'green');
        }
    }

    // Highlight the last node
    const lastNode = svg.querySelector(`circle[data-node="${path[path.length - 1]}"]`);
    if (lastNode) {
        lastNode.setAttribute('fill', 'green');
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function deleteNode() {
    const nodeToDelete = document.getElementById('delete-node').value;

    if (!graph[nodeToDelete]) {
        alert('Node does not exist.');
        return;
    }

    // Remove edges connected to the node
    for (let neighbor in graph) {
        graph[neighbor] = graph[neighbor].filter(edge => edge.node !== nodeToDelete);
    }

    delete graph[nodeToDelete];

    // Remove the node from the edges array
    edges = edges.filter(edge => edge.source !== nodeToDelete && edge.target !== nodeToDelete);

    document.getElementById('delete-node').value = '';

    drawGraph();
}

function editNode() {
    const node = document.getElementById('edit-node').value;
    const neighbor = document.getElementById('edit-neighbor').value;
    const newCost = parseFloat(document.getElementById('new-cost').value);
    const newDensity = parseFloat(document.getElementById('new-density').value);

    if (!node || !neighbor || isNaN(newCost) || isNaN(newDensity)) {
        alert('Incomplete input. Please fill in all fields.');
        return;
    }

    const effectiveCost = newCost * (1 + newDensity);

    let edgeFound = false;

    if (graph[node]) {
        for (let edge of graph[node]) {
            if (edge.node === neighbor) {
                edge.cost = effectiveCost;
                edgeFound = true;
                break;
            }
        }
    }

    if (graph[neighbor]) {
        for (let edge of graph[neighbor]) {
            if (edge.node === node) {
                edge.cost = effectiveCost;
                edgeFound = true;
                break;
            }
        }
    }

    if (!edgeFound) {
        alert('Edge does not exist.');
        return;
    }

    edges = edges.map(edge => {
        if ((edge.source === node && edge.target === neighbor) || (edge.source === neighbor && edge.target === node)) {
            return { source: node, target: neighbor, cost: effectiveCost };
        }
        return edge;
    });

    document.getElementById('edit-node').value = '';
    document.getElementById('edit-neighbor').value = '';
    document.getElementById('new-cost').value = '';
    document.getElementById('new-density').value = '';

    drawGraph();
}
