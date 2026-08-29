/* =====================================
   STUDYFOCUS
===================================== */


/* =====================================
   DARK MODE
===================================== */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("studyfocus-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "studyfocus-theme",
        dark ? "dark" : "light"
    );

    themeToggle.textContent =
        dark ? "☀️" : "🌙";

});


/* =====================================
   TIMER
===================================== */

let totalSeconds = 25 * 60;
let timerInterval = null;
let running = false;
let focusSeconds = 0;

const timer =
    document.getElementById("timer");

const status =
    document.getElementById("timerStatus");

const startBtn =
    document.getElementById("startBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const resetBtn =
    document.getElementById("resetBtn");

const summaryTime =
    document.getElementById("summaryTime");


function updateTimer() {

    const minutes =
        Math.floor(totalSeconds / 60);

    const seconds =
        totalSeconds % 60;

    timer.textContent =
        String(minutes).padStart(2, "0")
        + ":"
        + String(seconds).padStart(2, "0");
}


function updateFocusTime() {

    const minutes =
        Math.floor(focusSeconds / 60);

    summaryTime.textContent =
        minutes + " minutes";

    localStorage.setItem(
        "studyfocus-focus-seconds",
        focusSeconds
    );
}


startBtn.addEventListener("click", function () {

    if (running) return;

    running = true;

    status.textContent =
        "🔥 Stay focused...";

    timerInterval =
        setInterval(function () {

            if (totalSeconds <= 0) {

                clearInterval(timerInterval);

                running = false;

                status.textContent =
                    "🎉 Session completed!";

                showToast(
                    "Study session completed!"
                );

                return;
            }

            totalSeconds--;

            focusSeconds++;

            updateTimer();

            updateFocusTime();

        }, 1000);

});


pauseBtn.addEventListener("click", function () {

    if (!running) return;

    clearInterval(timerInterval);

    running = false;

    status.textContent =
        "⏸ Timer paused";

});


resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    running = false;

    totalSeconds = 25 * 60;

    status.textContent =
        "Ready to focus";

    updateTimer();

});


/* QUICK TIME */

document
    .querySelectorAll(".quick button")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                clearInterval(timerInterval);

                running = false;

                const minutes =
                    Number(
                        button.dataset.time
                    );

                totalSeconds =
                    minutes * 60;

                status.textContent =
                    minutes +
                    " minute session ready";

                updateTimer();

            }
        );

    });


/* =====================================
   TODAY PLAN
===================================== */

const subject =
    document.getElementById("subject");

const hours =
    document.getElementById("hours");

const minutes =
    document.getElementById("minutes");

const plan =
    document.getElementById("plan");

const summarySubject =
    document.getElementById("summarySubject");

const summaryGoal =
    document.getElementById("summaryGoal");


document
    .getElementById("savePlan")
    .addEventListener("click", function () {

        if (subject.value.trim() === "") {

            showToast(
                "Please enter a subject."
            );

            subject.focus();

            return;
        }

        localStorage.setItem(
            "studyfocus-subject",
            subject.value
        );

        localStorage.setItem(
            "studyfocus-hours",
            hours.value
        );

        localStorage.setItem(
            "studyfocus-minutes",
            minutes.value
        );

        localStorage.setItem(
            "studyfocus-plan",
            plan.value
        );

        updateSummary();

        showToast(
            "Today's plan saved ✓"
        );

    });


function updateSummary() {

    const savedSubject =
        localStorage.getItem(
            "studyfocus-subject"
        );

    const savedHours =
        Number(
            localStorage.getItem(
                "studyfocus-hours"
            )
        ) || 0;

    const savedMinutes =
        Number(
            localStorage.getItem(
                "studyfocus-minutes"
            )
        ) || 0;

    summarySubject.textContent =
        savedSubject || "Not selected";

    const total =
        savedHours * 60 +
        savedMinutes;

    summaryGoal.textContent =
        total + " minutes";
}


/* =====================================
   STUDIED
===================================== */

document
    .getElementById("saveStudied")
    .addEventListener("click", function () {

        localStorage.setItem(
            "studyfocus-studied",
            document.getElementById(
                "studied"
            ).value
        );

        showToast(
            "Today's progress saved ✓"
        );

    });


/* =====================================
   PENDING
===================================== */

document
    .getElementById("savePending")
    .addEventListener("click", function () {

        localStorage.setItem(
            "studyfocus-pending",
            document.getElementById(
                "pending"
            ).value
        );

        showToast(
            "Pending work saved ✓"
        );

    });


/* =====================================
   YESTERDAY
===================================== */

document
    .getElementById("saveYesterday")
    .addEventListener("click", function () {

        localStorage.setItem(
            "studyfocus-yesterday",
            document.getElementById(
                "yesterday"
            ).value
        );

        showToast(
            "Yesterday's record saved ✓"
        );

    });


/* =====================================
   LOAD SAVED DATA
===================================== */

function loadData() {

    subject.value =
        localStorage.getItem(
            "studyfocus-subject"
        ) || "";

    hours.value =
        localStorage.getItem(
            "studyfocus-hours"
        ) || "";

    minutes.value =
        localStorage.getItem(
            "studyfocus-minutes"
        ) || "";

    plan.value =
        localStorage.getItem(
            "studyfocus-plan"
        ) || "";

    document.getElementById(
        "studied"
    ).value =
        localStorage.getItem(
            "studyfocus-studied"
        ) || "";

    document.getElementById(
        "pending"
    ).value =
        localStorage.getItem(
            "studyfocus-pending"
        ) || "";

    document.getElementById(
        "yesterday"
    ).value =
        localStorage.getItem(
            "studyfocus-yesterday"
        ) || "";

    focusSeconds =
        Number(
            localStorage.getItem(
                "studyfocus-focus-seconds"
            )
        ) || 0;

    updateTimer();

    updateSummary();

    updateFocusTime();
}


/* =====================================
   TOAST
===================================== */

let toastTimer;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(function () {

            toast.classList.remove("show");

        }, 2200);
}


/* =====================================
   START APP
===================================== */

loadData();