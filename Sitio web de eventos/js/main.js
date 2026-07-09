document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LÓGICA DEL CARRUSEL DE IMÁGENES
    // ==========================================
    const slides = document.querySelectorAll(".carousel-slide");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    let currentIndex = 0;
    let slideInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        slides[currentIndex].classList.remove("active");
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add("active");
    }

    function nextSlide() { showSlide(currentIndex + 1); }
    function prevSlide() { showSlide(currentIndex - 1); }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => { nextSlide(); resetInterval(); }); 
        prevBtn.addEventListener("click", () => { prevSlide(); resetInterval(); });
    }

    function startInterval() { slideInterval = setInterval(nextSlide, 5000); }
    function resetInterval() { clearInterval(slideInterval); startInterval(); }
    if (slides.length > 0) { startInterval(); }


    // ==========================================
    // 2. LÓGICA DE FILTRADO PARA EL MENÚ
    // ==========================================
    const navLinks = document.querySelectorAll(".nav-menu .nav-link");
    const eventCards = document.querySelectorAll(".event-card");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            const selectedCategory = link.textContent.trim().toLowerCase();

            eventCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category").toLowerCase();
                if (selectedCategory === "inicio" || cardCategory === selectedCategory) {
                    card.style.display = "flex"; 
                } else {
                    card.style.display = "none"; 
                }
            });
        });
    });


    // ==========================================
    // 3. CONTROL DE MODALES (ABRIR Y CERRAR)
    // ==========================================
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    
    const openLoginBtn = document.getElementById("openLoginBtn");
    const openRegisterBtn = document.getElementById("openRegisterBtn");
    
    const closeLogin = document.getElementById("closeLogin");
    const closeRegister = document.getElementById("closeRegister");

    // Abrir Modales
    if(openLoginBtn) openLoginBtn.addEventListener("click", () => loginModal.classList.add("show"));
    if(openRegisterBtn) openRegisterBtn.addEventListener("click", () => registerModal.classList.add("show"));

    // Cerrar Modales
    if(closeLogin) closeLogin.addEventListener("click", () => loginModal.classList.remove("show"));
    if(closeRegister) closeRegister.addEventListener("click", () => registerModal.classList.remove("show"));

    // Cerrar al hacer clic fuera de la caja del modal
    window.addEventListener("click", (e) => {
        if (e.target === loginModal) loginModal.classList.remove("show");
        if (e.target === registerModal) registerModal.classList.remove("show");
    });


    // ==========================================
    // 4. AUTENTICACIÓN SIMULADA EN RAM (SessionStorage)
    // ==========================================
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const navActions = document.getElementById("navActions");

    // Función para actualizar los botones de la barra superior según el estado del usuario
    function updateNavbar() {
        const currentUser = JSON.parse(sessionStorage.getItem("activeUser"));
        
        if (currentUser) {
            // El usuario está logueado: Reemplazar los botones por su nombre y botón de salir
            navActions.innerHTML = `
                <div class="search-box">
                    <input type="text" placeholder="Buscar evento...">
                </div>
                <span class="user-greeting">¡Hola, ${currentUser.name}!</span>
                <button class="btn-register" id="logoutBtn">Salir</button>
            `;
            
            // Evento para cerrar sesión
            document.getElementById("logoutBtn").addEventListener("click", () => {
                sessionStorage.removeItem("activeUser");
                alert("Sesión cerrada.");
                window.location.reload(); // Recarga la página limpia
            });
        }
    }

    // Proceso de Registro (Guardar datos en la RAM temporal del navegador)
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const name = document.getElementById("regName").value;
            const email = document.getElementById("regEmail").value;
            const password = document.getElementById("regPassword").value;

            // Simulamos guardar la información del usuario registrado
            const userData = { name, email, password };
            sessionStorage.setItem("registeredUser", JSON.stringify(userData));

            alert("¡Cuenta creada con éxito en la RAM temporal! Ya puedes iniciar sesión.");
            registerForm.reset();
            registerModal.classList.remove("show");
        });
    }

    // Proceso de Login (Validar contra la info guardada temporalmente)
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            // Obtener el usuario guardado previamente en el Registro temporal
            const registeredUser = JSON.parse(sessionStorage.getItem("registeredUser"));

            if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
                // Login exitoso -> guardamos al usuario activo
                sessionStorage.setItem("activeUser", JSON.stringify(registeredUser));
                alert(`¡Bienvenido de nuevo, ${registeredUser.name}!`);
                loginForm.reset();
                loginModal.classList.remove("show");
                updateNavbar(); // Actualiza la interfaz
            } else {
                alert("Error: Las credenciales no coinciden o el usuario no existe en el registro temporal.");
            }
        });
    }

    // Comprobar si ya había una sesión activa al cargar o actualizar la página
    updateNavbar();
});