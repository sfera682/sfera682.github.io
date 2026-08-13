let step = 1;

const screens = document.querySelectorAll(".calc-screen");
const progress = document.getElementById("progress");
const stepText = document.getElementById("stepText");

function showStep() {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const currentScreen = {
        1: "screenSelect",
        2: "screenFacade",
        3: "screenCountertop",
        4: "screenBacksplash",
        5: "screenResult"
    };

    const screenId = currentScreen[step];
    const screen = document.getElementById(screenId);

    if (screen) {
        screen.classList.add("active");
    }

    if (progress) {
        progress.style.width = ((step - 1) * 25) + "%";
    }

    if (stepText) {
        stepText.textContent = "Шаг " + step;
    }
}

function nextStep() {
    if (step === 1) {
        const facades = document.getElementById("facades").checked;
        const countertop = document.getElementById("countertop").checked;
        const backsplash = document.getElementById("backsplash").checked;

        if (!facades && !countertop && !backsplash) {
            alert("Выберите хотя бы один вариант.");
            return;
        }

        if (facades) {
            step = 2;
        } else if (countertop) {
            step = 3;
        } else if (backsplash) {
            step = 4;
        }

        showStep();
        return;
    }

    if (step === 2) {
        const countertop = document.getElementById("countertop").checked;
        const backsplash = document.getElementById("backsplash").checked;

        if (countertop) {
            step = 3;
        } else if (backsplash) {
            step = 4;
        } else {
            calculate();
            return;
        }

        showStep();
        return;
    }

    if (step === 3) {
        const backsplash = document.getElementById("backsplash").checked;

        if (backsplash) {
            step = 4;
            showStep();
        } else {
            calculate();
        }

        return;
    }

    if (step === 4) {
        calculate();
        return;
    }
}

function prevStep() {
    if (step === 5) {
        if (document.getElementById("backsplash").checked) {
            step = 4;
        } else if (document.getElementById("countertop").checked) {
            step = 3;
        } else if (document.getElementById("facades").checked) {
            step = 2;
        } else {
            step = 1;
        }

        showStep();
        return;
    }

    if (step === 4) {
        if (document.getElementById("countertop").checked) {
            step = 3;
        } else if (document.getElementById("facades").checked) {
            step = 2;
        } else {
            step = 1;
        }

        showStep();
        return;
    }

    if (step === 3) {
        if (document.getElementById("facades").checked) {
            step = 2;
        } else {
            step = 1;
        }

        showStep();
        return;
    }

    if (step === 2) {
        step = 1;
        showStep();
    }
}

function calculate() {
    let material = 0;
    let work = 0;

    const facades = document.getElementById("facades").checked;
    const countertop = document.getElementById("countertop").checked;
    const backsplash = document.getElementById("backsplash").checked;

    if (facades) {
        const length = parseFloat(
            document.getElementById("kitchenLength").value
        ) || 0;

        const top = parseFloat(
            document.getElementById("topHeight").value
        ) || 0;

        const bottom = parseFloat(
            document.getElementById("bottomHeight").value
        ) || 0;

        const area = (length * (top + bottom)) / 10000;

        let price = 22000;

        const facadeMaterial = document.querySelector(
            "input[name='facadeMaterial']:checked"
        );

        if (facadeMaterial && facadeMaterial.value === "mdf") {
            price = 36000;
        }

        material += area * price;
        work += 38000;
    }

    if (countertop) {
        const length = parseFloat(
            document.getElementById("countertopLength").value
        ) || 0;

        const sheets = Math.ceil(length / 300);

        let price = 49000;

        const countertopType = document.querySelector(
            "input[name='countertopType']:checked"
        );

        if (countertopType) {
            price = parseInt(countertopType.value);
        }

        material += price * sheets;
        work += 45000;
    }

    if (backsplash) {
        const length = parseFloat(
            document.getElementById("backsplashLength").value
        ) || 0;

        const sheets = Math.ceil(length / 300);

        material += 41000 * sheets;
        work += 25000;
    }

    document.getElementById("materialsPrice").textContent =
        Math.round(material).toLocaleString("ru-RU") + " ₸";

    document.getElementById("workPrice").textContent =
        Math.round(work).toLocaleString("ru-RU") + " ₸";

    document.getElementById("totalPrice").textContent =
        Math.round(material + work).toLocaleString("ru-RU") + " ₸";

    step = 5;
    showStep();
}

showStep();
