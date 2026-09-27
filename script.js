document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PAGE REVEAL
    ========================= */

    document.body.classList.add("page-loaded");


    /* =========================
       LAMP LOGIN ANIMATION
    ========================= */

    const lampCord =
        document.getElementById("lampCord");

    const lampExperience =
        document.querySelector(".lamp-experience");

    if (lampCord && lampExperience) {

        let startY = 0;
        let isDragging = false;

        const activateLamp = () => {

            lampExperience.classList.toggle(
                "lamp-active"
            );

        };


        lampCord.addEventListener(
            "pointerdown",
            (event) => {

                startY = event.clientY;
                isDragging = true;

                lampCord.classList.add("dragging");

                lampCord.setPointerCapture(
                    event.pointerId
                );

            }
        );


        lampCord.addEventListener(
            "pointermove",
            (event) => {

                if (!isDragging) {
                    return;
                }

                const distance =
                    event.clientY - startY;

                if (distance > 25) {

                    isDragging = false;

                    lampCord.classList.remove("dragging");

                    activateLamp();

                }

            }
        );


        lampCord.addEventListener(
            "pointercancel",
            () => {

                isDragging = false;

                lampCord.classList.remove("dragging");

            }
        );

    }


    /* =========================
       PASSWORD TOGGLE
    ========================= */

    const passwordInput =
        document.getElementById("password");

    const passwordToggle =
        document.getElementById("passwordToggle");

    if (passwordInput && passwordToggle) {

        passwordToggle.addEventListener("click", () => {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";
                passwordToggle.textContent = "◉";

            } else {

                passwordInput.type = "password";
                passwordToggle.textContent = "◉";

            }

        });

    }


    /* =========================
       REGISTER FORM
    ========================= */

    const registerForm =
        document.getElementById("registerForm");

    const formMessage =
        document.getElementById("formMessage");

    if (registerForm) {

        registerForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const password =
                document.getElementById("password");

            const field =
                document.getElementById("field");

            const terms =
                document.getElementById("terms");


            if (
                !name ||
                !email ||
                !password ||
                !field ||
                !terms
            ) {
                return;
            }


            if (
                name.value.trim() === "" ||
                email.value.trim() === "" ||
                password.value.trim() === "" ||
                field.value === "" ||
                !terms.checked
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "يرجى إكمال جميع البيانات المطلوبة.";

                    formMessage.className =
                        "form-message error";

                }

                return;
            }


            if (password.value.length < 6) {

                if (formMessage) {

                    formMessage.textContent =
                        "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل.";

                    formMessage.className =
                        "form-message error";

                }

                return;
            }


            if (formMessage) {

                formMessage.textContent =
                    `مرحبًا ${name.value.trim()}! تم إرسال طلب التسجيل بنجاح.`;

                formMessage.className =
                    "form-message success";

            }


            registerForm.reset();

        });

    }


    /* =========================
       CARD MOUSE EFFECT
    ========================= */

    const cards = document.querySelectorAll(
        ".feature-card, .about-card, .register-card"
    );

    cards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        });

    });


    /* =========================
       MOUSE GLOW
    ========================= */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.style.position = "fixed";
    cursorGlow.style.left = "0";
    cursorGlow.style.top = "0";
    cursorGlow.style.width = "180px";
    cursorGlow.style.height = "180px";
    cursorGlow.style.borderRadius = "50%";
    cursorGlow.style.pointerEvents = "none";
    cursorGlow.style.zIndex = "9999";
    cursorGlow.style.transform =
        "translate(-50%, -50%)";

    cursorGlow.style.background =
        "radial-gradient(circle, rgba(40, 232, 255, 0.13), rgba(40, 232, 255, 0.035) 35%, transparent 70%)";

    cursorGlow.style.filter = "blur(4px)";
    cursorGlow.style.opacity = "0";
    cursorGlow.style.transition =
        "opacity 0.12s ease";

    document.body.appendChild(cursorGlow);


    /* آخر مكان معروف للماوس */

    let lastMouseX = 0;
    let lastMouseY = 0;


    /* حركة الماوس */

    document.addEventListener(
        "mousemove",
        (event) => {

            lastMouseX = event.clientX;
            lastMouseY = event.clientY;

            cursorGlow.style.left =
                `${lastMouseX}px`;

            cursorGlow.style.top =
                `${lastMouseY}px`;

            cursorGlow.style.opacity = "1";

        }
    );


    /* تحديث موضع الضوء أثناء التمرير */

    window.addEventListener(
        "scroll",
        () => {

            cursorGlow.style.left =
                `${lastMouseX}px`;

            cursorGlow.style.top =
                `${lastMouseY}px`;

        }
    );


    /* إخفاء الضوء عند خروج الماوس */

    document.addEventListener(
        "mouseleave",
        () => {

            cursorGlow.style.opacity = "0";

        }
    );


    /* =========================
       CURRENT YEAR
    ========================= */

    const yearElements =
        document.querySelectorAll("[data-year]");

    yearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =========================
       SMOOTH INTERNAL LINKS
    ========================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(targetId);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });

});
