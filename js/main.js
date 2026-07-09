// ==========================================
// 1. POO - CLASE BASE: EVENTO (Encapsulamiento)
// ==========================================
class Evento {
    // Atributos privados según rúbrica (Uso de #)
    #id;
    #nombre;
    #fecha;
    #ubicacion;
    #categoria;
    #imagen;
    #inscrito;

    constructor(id, nombre, fecha, ubicacion, categoria, imagen) {
        this.#id = id;
        this.#nombre = nombre;
        this.#fecha = fecha;
        this.#ubicacion = ubicacion;
        this.#categoria = categoria;
        this.#imagen = imagen;
        this.#inscrito = false; // Estado inicial: No inscrito
    }

    // Getters y Setters eficientes
    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get fecha() { return this.#fecha; }
    get ubicacion() { return this.#ubicacion; }
    get categoria() { return this.#categoria; }
    get imagen() { return this.#imagen; }
    get inscrito() { return this.#inscrito; }

    set inscrito(nuevoEstado) {
        this.#inscrito = nuevoEstado;
    }

    // Método para alternar la inscripción (Acción dinámica)
    alternarInscripcion() {
        this.#inscrito = !this.#inscrito;
        return this.#inscrito;
    }

    // Polimorfismo: Método base que las clases hijas pueden personalizar
    obtenerTagTexto() {
        return this.#categoria;
    }
}

// ==========================================
// 2. POO - CLASE HIJA: EVENTODESTACADO (Herencia)
// ==========================================
class EventoDestacado extends Evento {
    #esSponsorOficial;

    constructor(id, nombre, fecha, ubicacion, categoria, imagen, esSponsor = false) {
        // Llamada al constructor de la clase padre (Herencia)
        super(id, nombre, fecha, ubicacion, categoria, imagen);
        this.#esSponsorOficial = esSponsor;
    }

    // Polimorfismo aplicado: Modifica el comportamiento del método original
    obtenerTagTexto() {
        return this.#esSponsorOficial ? `${super.categoria} | ⭐ Destacado` : super.categoria;
    }
}

// ==========================================
// 3. POO - CLASE CONTROLADORA: GESTOREVENTOS
// ==========================================
class GestorEventos {
    #listaEventos;

    constructor() {
        this.#listaEventos = [];
    }

    agregarEvento(evento) {
        this.#listaEventos.push(evento);
    }

    obtenerTodos() {
        return this.#listaEventos;
    }

    // Método de filtrado avanzado por categoría o buscador de texto
    filtrar(categoriaSeleccionada, textoBusqueda) {
        return this.#listaEventos.filter(evento => {
            const coincideCategoria = categoriaSeleccionada === 'todos' || evento.categoria === categoriaSeleccionada;
            const coincideTexto = evento.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) || 
                                 evento.ubicacion.toLowerCase().includes(textoBusqueda.toLowerCase());
            return coincideCategoria && coincideTexto;
        });
    }

    buscarPorId(id) {
        return this.#listaEventos.find(evento => evento.id === id);
    }

    // Renderiza las tarjetas respetando de forma exacta el diseño CSS original
    renderizar(eventosFiltrados) {
        const grid = document.getElementById('eventGrid');
        if (!grid) return;
        
        grid.innerHTML = '';

        if (eventosFiltrados.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px 0;">No se encontraron eventos con los filtros seleccionados.</p>`;
            return;
        }

        eventosFiltrados.forEach(evento => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'event-card';
            
            // Si está inscrito, le añadimos un borde celeste sutil para feedback visual
            if (evento.inscrito) {
                tarjeta.style.borderColor = '#38bdf8';
                tarjeta.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.15)';
            }

            tarjeta.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${evento.imagen}" alt="${evento.nombre}">
                </div>
                <div class="card-content">
                    <span class="card-tag">${evento.obtenerTagTexto()}</span>
                    <h3 class="event-title">${evento.nombre}</h3>
                    <p class="event-info">📅 ${evento.fecha} | 📍 ${evento.ubicacion}</p>
                    
                    <!-- Botón Dinámico de Inscripción (Estructuras de Control) -->
                    <button class="btn-inscripcion ${evento.inscrito ? 'cancelar' : ''}" data-id="${evento.id}">
                        ${evento.inscrito ? 'Cancelar Inscripción' : 'Inscribirme en Evento'}
                    </button>
                </div>
            `;
            grid.appendChild(tarjeta);
        });
    }
}

// ==========================================
// 4. INICIALIZACIÓN Y EVENTOS DEL DOM
// ==========================================
const gestor = new GestorEventos();

// Carga de la estructura de datos (Arreglo de Objetos usando las clases)
gestor.agregarEvento(new EventoDestacado(1, 'Paulo Londra: Next Rounds', '29 de Agosto', 'Estadio Nacional', 'conciertos', 'img/paulo londra.jpg', true));
gestor.agregarEvento(new EventoDestacado(2, 'Ricky Martin Live', '10 de Septiembre', 'Costa 21', 'conciertos', 'img/ricky marti.jpg', true));
gestor.agregarEvento(new EventoDestacado(3, 'Chyno y Nacho: Radio Venezuela Tour', '09 de Octubre', 'Costa 21', 'conciertos', 'img/chino y nacho.jpg', true));
gestor.agregarEvento(new Evento(4, 'Orquesta Sinfónica Nacional del Perú', '07 de Agosto (8:00 P.M.)', 'Gran Teatro Nacional', 'teatro', 'img/orquesta sinfonica.png'));
gestor.agregarEvento(new Evento(5, 'Las Aventuras de Mario y Luigi', 'Todos los Domingos', 'C.C. Jesús María', 'teatro', 'img/mario.png'));
gestor.agregarEvento(new Evento(6, 'Atahualpa (Ópera de Carlo Enrico Pasta)', '3, 5 y 8 de Julio', 'Teatro Municipal de Lima', 'teatro', 'img/atagualpha.jpg'));
gestor.agregarEvento(new Evento(7, 'Yaco y el Loco: Gira Nacional', 'Fin de Semana', 'Punch Studio', 'teatro', 'img/yaco loco.jpg')); // Ruta corregida
gestor.agregarEvento(new Evento(8, 'Hablando Huevadas: Amor y Odio', 'Temporada en Vivo', 'Teatro Canout', 'teatro', 'img/hablando wbds.jpg'));
gestor.agregarEvento(new Evento(9, 'Circo de las Estrellas: La Carlota', '15 Jul al 30 Ago', 'Parque de las Leyendas', 'teatro', 'img/circo estrella.jpg'));
gestor.agregarEvento(new Evento(10, 'Festival Mundial de Circo', '10 al 12 de Agosto', 'Expl. Jockey Club', 'teatro', 'img/festival mundial  circo.jpg'));
gestor.agregarEvento(new Evento(11, 'Fútbol Fest X', 'Evento Deportivo', 'Deporplaza', 'deportes', 'img/fubol fest.jpg'));

// Variables de Estado de Filtros
let categoriaActual = 'todos';
let busquedaActual = '';

document.addEventListener('DOMContentLoaded', () => {
    // Render inicial
    gestor.renderizar(gestor.obtenerTodos());

    // ------------------------------------------
    // FILTRADO Y BÚSQUEDA EN TIEMPO REAL
    // ------------------------------------------
    const searchInput = document.getElementById('searchInput');
    const menuLinks = document.querySelectorAll('.nav-menu .nav-link');

    // Filtro por Buscador de texto
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            busquedaActual = e.target.value;
            const filtrados = gestor.filtrar(categoriaActual, busquedaActual);
            gestor.renderizar(filtrados);
        });
    }

    // Filtro por categorías del menú superior
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Convertimos el texto del menú al identificador de categoría
            const textoMenu = link.textContent.toLowerCase();
            if (textoMenu === 'inicio') categoriaActual = 'todos';
            else if (textoMenu === 'conciertos') categoriaActual = 'conciertos';
            else if (textoMenu === 'teatro') categoriaActual = 'teatro';
            else if (textoMenu === 'deportes') categoriaActual = 'deportes';

            const filtrados = gestor.filtrar(categoriaActual, busquedaActual);
            gestor.renderizar(filtrados);
        });
    });

    // ------------------------------------------
    // GESTIÓN DE INSCRIPCIONES (Delegación de eventos DOM)
    // ------------------------------------------
    const grid = document.getElementById('eventGrid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-inscripcion')) {
                const idEvento = parseInt(e.target.getAttribute('data-id'));
                const evento = gestor.buscarPorId(idEvento);

                if (evento) {
                    const seInscribio = evento.alternarInscripcion();
                    
                    // Alertas limpias nativas sin romper la UI
                    if (seInscribio) {
                        alert(`¡Inscripción exitosa al evento: ${evento.nombre}!`);
                    } else {
                        alert(`Inscripción cancelada para: ${evento.nombre}`);
                    }

                    // Refrescar la interfaz inmediatamente manteniendo los filtros activos
                    const filtrados = gestor.filtrar(categoriaActual, busquedaActual);
                    gestor.renderizar(filtrados);
                }
            }
        });
    }

    // ------------------------------------------
    // LÓGICA DEL MODAL DE AUTENTICACIÓN
    // ------------------------------------------
    const authModal = document.getElementById('authModal');
    const openAuthBtn = document.getElementById('openAuthBtn');
    const closeAuth = document.getElementById('closeAuth');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');

    if (openAuthBtn && authModal) {
        openAuthBtn.addEventListener('click', (e) => {
            e.preventDefault();
            authModal.classList.add('show');
        });
    }

    if (closeAuth && authModal) {
        closeAuth.addEventListener('click', () => authModal.classList.remove('show'));
    }

    if (switchToRegister && loginSection && registerSection) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginSection.style.display = 'none';
            registerSection.style.display = 'block';
        });
    }

    if (switchToLogin && loginSection && registerSection) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
        });
    }

    // Cierre del modal haciendo clic afuera
    window.addEventListener('click', (e) => {
        if (e.target === authModal) authModal.classList.remove('show');
    });

    // ------------------------------------------
    // VALIDACIONES DE FORMULARIOS (Exigido en Rúbrica)
    // ------------------------------------------
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value.trim();
            const pass = document.getElementById('loginPassword').value;

            if (email === "" || pass.length < 6) {
                alert("Por favor, ingrese un correo válido y una contraseña de mínimo 6 caracteres.");
                return;
            }

            alert(`¡Bienvenido de nuevo a KRONOS!`);
            authModal.classList.remove('show');
            
            if (openAuthBtn) {
                openAuthBtn.textContent = email.split('@')[0].toUpperCase();
                openAuthBtn.style.color = '#38bdf8';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('regName').value.trim();
            const dni = document.getElementById('regDocument').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const pass = document.getElementById('regPassword').value;

            if (name.length < 3) {
                alert("Por favor, ingrese un nombre completo válido.");
                return;
            }
            if (dni.length < 8) {
                alert("El documento de identidad debe tener al menos 8 dígitos.");
                return;
            }
            if (phone.length < 9) {
                alert("El número de celular debe tener 9 dígitos.");
                return;
            }
            if (pass.length < 6) {
                alert("La contraseña debe tener un mínimo de 6 caracteres.");
                return;
            }

            alert(`¡Cuenta creada con éxito, ${name}! Ya puedes iniciar sesión.`);
            
            registerForm.reset();
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
        });
    }
});

// ==========================================
// 5. LÓGICA DEL CARRUSEL DE IMÁGENES
// ==========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(index) {
    if (totalSlides === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    
    currentSlide = index;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    
    slides[currentSlide].classList.add('active');
}

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

// Auto avance automático cada 5 segundos
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);