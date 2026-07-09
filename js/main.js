class Evento {
    #id; #nombre; #fecha; #ubicacion; #categoria; #imagen;

    constructor(id, nombre, fecha, ubicacion, categoria, imagen) {
        this.#id = id; this.#nombre = nombre; this.#fecha = fecha;
        this.#ubicacion = ubicacion; this.#categoria = categoria; this.#imagen = imagen;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get fecha() { return this.#fecha; }
    get ubicacion() { return this.#ubicacion; }
    get categoria() { return this.#categoria; }
    get imagen() { return this.#imagen; }
}

class GestorEventos {
    #listaEventos;
    constructor() { this.#listaEventos = []; }
    agregarEvento(evento) { this.#listaEventos.push(evento); }
    obtenerTodos() { return this.#listaEventos; }

    filtrar(categoria, busqueda) {
        return this.#listaEventos.filter(e => {
            const matchCat = categoria === 'todos' || e.categoria === categoria;
            const matchText = e.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                              e.ubicacion.toLowerCase().includes(busqueda.toLowerCase());
            return matchCat && matchText;
        });
    }

    renderizar(lista) {
        const grid = document.getElementById('eventGrid');
        if (!grid) return;
        grid.innerHTML = '';

        if (lista.length === 0) {
            grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#64748b; padding:40px 0;">No se encontraron eventos.</p>`;
            return;
        }

        lista.forEach(e => {
            const tarjeta = document.createElement('a');
            tarjeta.href = '#';
            tarjeta.className = 'event-card';
            tarjeta.setAttribute('data-id', e.id);
            tarjeta.innerHTML = `
                <div class="card-img-wrapper"><img src="${e.imagen}" alt="${e.nombre}"></div>
                <div class="card-content">
                    <span class="card-tag">${e.categoria.toUpperCase()}</span>
                    <h3 class="event-title">${e.nombre}</h3>
                    <p class="event-info">📅 ${e.fecha} | 📍 ${e.ubicacion}</p>
                </div>
            `;
            grid.appendChild(tarjeta);
        });
    }
}

const gestor = new GestorEventos();
gestor.agregarEvento(new Evento(1, 'Paulo Londra: Next Rounds', '29 de Agosto', 'Estadio Nacional', 'conciertos', 'img/paulo londra.jpg'));
gestor.agregarEvento(new Evento(2, 'Ricky Martin Live', '10 de Septiembre', 'Costa 21', 'conciertos', 'img/ricky marti.jpg'));
gestor.agregarEvento(new Evento(3, 'Chyno y Nacho: Radio Venezuela Tour', '09 de Octubre', 'Costa 21', 'conciertos', 'img/chino y nacho.jpg'));
gestor.agregarEvento(new Evento(4, 'Orquesta Sinfónica Nacional del Perú', '07 de Agosto', 'Gran Teatro Nacional', 'teatro', 'img/orquesta sinfonica.png'));
gestor.agregarEvento(new Evento(5, 'Las Aventuras de Mario y Luigi', 'Todos los Domingos', 'C.C. Jesús María', 'teatro', 'img/mario.png'));
gestor.agregarEvento(new Evento(6, 'Hablando Huevadas: Amor y Odio', 'Temporada en Vivo', 'Teatro Canout', 'teatro', 'img/hablando wbds.jpg'));
gestor.agregarEvento(new Evento(7, 'Fútbol Fest X', 'Evento Deportivo', 'Deporplaza', 'deportes', 'img/fubol fest.jpg'));

let catFiltro = 'todos';
let txtFiltro = '';

document.addEventListener('DOMContentLoaded', () => {
    gestor.renderizar(gestor.obtenerTodos());

    document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
        if (!link.getAttribute('data-categoria')) return; 
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-menu .nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            catFiltro = link.getAttribute('data-categoria');
            if (document.getElementById('sectionTitle')) {
                document.getElementById('sectionTitle').textContent = catFiltro === 'todos' ? "Próximos Eventos Destacados" : `Cartelera de ${catFiltro.toUpperCase()}`;
            }
            if (document.getElementById('mainCarousel')) {
                document.getElementById('mainCarousel').style.display = catFiltro === 'todos' ? 'block' : 'none';
            }
            
            gestor.renderizar(gestor.filtrar(catFiltro, txtFiltro));
        });
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            txtFiltro = e.target.value;
            gestor.renderizar(gestor.filtrar(catFiltro, txtFiltro));
        });
    }

    const eventGrid = document.getElementById('eventGrid');
    if (eventGrid) {
        eventGrid.addEventListener('click', (e) => {
            const tarjeta = e.target.closest('.event-card');
            if (!tarjeta) return;
            e.preventDefault();

            const id = tarjeta.getAttribute('data-id');
            localStorage.setItem('eventoSeleccionado', id);
            window.location.href = 'evento.html';
        });
    }

    const modal = document.getElementById('authModal');
    const openBtn = document.getElementById('openAuthBtn');
    const closeBtn = document.getElementById('closeAuth');
    const loginForm = document.getElementById('loginForm');
    const modalSubmitBtn = document.getElementById('modalSubmitBtn');
    const switchBox = document.getElementById('switchBox');
    
    const modalTitle = document.getElementById('modalTitle');
    const registroCampos = document.getElementById('registroCampos');
    const regNombre = document.getElementById('regNombre');
    const regDoc = document.getElementById('regDoc');
    const regCelular = document.getElementById('regCelular');
    const regFechaNac = document.getElementById('regFechaNac');

    if (openBtn && modal) {
        openBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            modal.classList.add('show'); 
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            if (loginForm) loginForm.reset();
            if (modalTitle) modalTitle.innerText = "Iniciar Sesión";
            if (modalSubmitBtn) modalSubmitBtn.innerText = "Ingresar";
            if (registroCampos) registroCampos.style.display = 'none';
            if (switchBox) switchBox.innerHTML = '¿No tienes una cuenta? <a href="#" id="goToRegister">Regístrate aquí</a>';
        });
    }

    if (loginForm && switchBox && modalSubmitBtn) {
        loginForm.addEventListener('click', function(e) {
            if (e.target && e.target.id === 'goToRegister') {
                e.preventDefault();
                if (modalTitle) modalTitle.innerText = "Crear Cuenta";
                modalSubmitBtn.innerText = "Registrarse";
                switchBox.innerHTML = '¿Ya tienes cuenta? <a href="#" id="goToLogin">Inicia sesión aquí</a>';
                
                if (registroCampos) {
                    registroCampos.style.display = 'block';
                    regNombre.required = true;
                    regDoc.required = true;
                    regCelular.required = true;
                    regFechaNac.required = true;
                }
            }
            
            if (e.target && e.target.id === 'goToLogin') {
                e.preventDefault();
                if (modalTitle) modalTitle.innerText = "Iniciar Sesión";
                modalSubmitBtn.innerText = "Ingresar";
                switchBox.innerHTML = '¿No tienes una cuenta? <a href="#" id="goToRegister">Regístrate aquí</a>';
                
                if (registroCampos) {
                    registroCampos.style.display = 'none';
                    regNombre.required = false;
                    regDoc.required = false;
                    regCelular.required = false;
                    regFechaNac.required = false;
                }
            }
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const esRegistro = registroCampos && registroCampos.style.display === 'block';
            
            if (esRegistro) {
                alert(`¡Cuenta creada y Registro exitoso!\nBienvenido/a, ${regNombre.value}.`);
            } else {
                alert("¡Sesión Iniciada con éxito!");
            }
            
            modal.classList.remove('show');
            loginForm.reset();
            if (modalTitle) modalTitle.innerText = "Iniciar Sesión";
            if (modalSubmitBtn) modalSubmitBtn.innerText = "Ingresar";
            if (registroCampos) registroCampos.style.display = 'none';
            switchBox.innerHTML = '¿No tienes una cuenta? <a href="#" id="goToRegister">Regístrate aquí</a>';
        });
    }
});

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
function showSlide(idx) {
    if(slides.length === 0) return;
    slides.forEach(s => s.classList.remove('active'));
    currentSlide = (idx + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}
if(document.getElementById('nextBtn')) document.getElementById('nextBtn').addEventListener('click', () => showSlide(currentSlide + 1));
if(document.getElementById('prevBtn')) document.getElementById('prevBtn').addEventListener('click', () => showSlide(currentSlide - 1));