const form = document.getElementById("computerForm");
const computerList = document.getElementById("computerList");
const search = document.getElementById("search");
const total = document.getElementById("total");

let computers = JSON.parse(
    localStorage.getItem("registeredComputers") || "[]"
);

function saveComputers() {
    localStorage.setItem(
        "registeredComputers",
        JSON.stringify(computers)
    );
}

function renderComputers() {
    const query = search.value.toLowerCase();

    const filtered = computers.filter(computer =>
        Object.values(computer).some(value =>
            String(value).toLowerCase().includes(query)
        )
    );

    computerList.innerHTML = "";

    filtered.forEach(computer => {
        const row = document.createElement("tr");

        [
            computer.id,
            computer.brand,
            computer.model,
            computer.location,
            computer.status
        ].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            if (confirm("Delete this computer record?")) {
                computers = computers.filter(
                    item => item.id !== computer.id
                );

                saveComputers();
                renderComputers();
            }
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        computerList.appendChild(row);
    });

    total.textContent =
        "Total Computers: " + computers.length;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const computer = {
        id: document.getElementById("computerId").value.trim(),
        brand: document.getElementById("brand").value.trim(),
        model: document.getElementById("model").value.trim(),
        location: document.getElementById("location").value.trim(),
        status: document.getElementById("status").value
    };

    if (computers.some(item =>
        item.id.toLowerCase() === computer.id.toLowerCase()
    )) {
        alert("This Computer ID is already registered.");
        return;
    }

    computers.push(computer);

    saveComputers();
    form.reset();
    renderComputers();

    alert("Computer registered successfully!");
});

search.addEventListener("input", renderComputers);

renderComputers();
