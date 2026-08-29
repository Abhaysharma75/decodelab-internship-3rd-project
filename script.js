/* =========================================
   STUDYFOCUS LOGIN
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("loginForm");

    const email =
        document.getElementById("email");

    const password =
        document.getElementById("password");

    const togglePassword =
        document.getElementById("togglePassword");

    const message =
        document.getElementById("message");

    const forgotPassword =
        document.getElementById("forgotPassword");

    const googleBtn =
        document.getElementById("googleBtn");

    const createAccount =
        document.getElementById("createAccount");


    /* =====================================
       SHOW / HIDE PASSWORD
    ===================================== */

    togglePassword.addEventListener(
        "click",
        () => {

            if (password.type === "password") {

                password.type = "text";

                togglePassword.textContent = "Hide";

            } else {

                password.type = "password";

                togglePassword.textContent = "Show";

            }

        }
    );


    /* =====================================
       LOGIN
    ===================================== */

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const emailValue =
                email.value.trim();

            const passwordValue =
                password.value.trim();


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(emailValue)) {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            if (passwordValue.length < 6) {

                showMessage(
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;
            }


            /*
                DEMO LOGIN

                Replace this section with
                your Flask/Python backend.

                Example:

                fetch("/login", {
                    method: "POST",
                    body: new FormData(form)
                })
            */


            showMessage(
                "Login successful! Opening StudyFocus...",
                "success"
            );


            setTimeout(() => {

                /*
                    Change this to your
                    dashboard page.

                    Example:

                    window.location.href =
                    "dashboard.html";
                */

                window.location.href =
                    "dashboard.html";

            }, 1000);

        }
    );


    /* =====================================
       FORGOT PASSWORD
    ===================================== */

    forgotPassword.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            showMessage(
                "Password recovery will be available soon.",
                "error"
            );

        }
    );


    /* =====================================
       GOOGLE
    ===================================== */

    googleBtn.addEventListener(
        "click",
        () => {

            showMessage(
                "Google authentication will be connected soon.",
                "error"
            );

        }
    );


    /* =====================================
       CREATE ACCOUNT
    ===================================== */

    createAccount.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            showMessage(
                "Create Account page will be available soon.",
                "error"
            );

        }
    );


    /* =====================================
       MESSAGE FUNCTION
    ===================================== */

    function showMessage(text, type) {

        message.textContent = text;

        message.className = type;

    }

});