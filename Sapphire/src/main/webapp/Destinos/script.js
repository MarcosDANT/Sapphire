document.addEventListener("DOMContentLoaded", () => {
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const monthLabel = document.querySelector(".month span");
    const daysTable = document.querySelector(".days tbody");

    let currentDate = new Date();
    let selectedDates = [];

    function updateCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        monthLabel.textContent = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

        daysTable.innerHTML = "";

        let row = document.createElement("tr");

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement("td");
            row.appendChild(emptyCell);
        }

        for (let day = 1; day <= lastDate; day++) {
            const cell = document.createElement("td");
            const button = document.createElement("button");
            button.textContent = day;
            button.classList.add("day-button");

            button.addEventListener("click", () => {
                if (selectedDates.length === 2) {
                    selectedDates.forEach(date => date.classList.remove("selected"));
                    selectedDates = [];
                }

                if (!button.classList.contains("selected")) {
                    button.classList.add("selected");
                    selectedDates.push(button);
                } else {
                    button.classList.remove("selected");
                    selectedDates = selectedDates.filter(date => date !== button);
                }

                if (selectedDates.length === 2) {
                    const [start, end] = selectedDates
                        .map(btn => parseInt(btn.textContent))
                        .sort((a, b) => a - b);
                    console.log(`Fecha de entrada: ${start}, Fecha de salida: ${end}`);
                }
            });

            cell.appendChild(button);
            row.appendChild(cell);

            if ((firstDay + day) % 7 === 0) {
                daysTable.appendChild(row);
                row = document.createElement("tr");
            }
        }

        if (row.children.length > 0) {
            daysTable.appendChild(row);
        }
    }

    updateCalendar(currentDate);

    prevButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar(currentDate);
    });

    nextButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar(currentDate);
    });
});