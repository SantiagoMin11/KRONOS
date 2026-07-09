class EventoCompra {
    #id; #nombre; #fecha; #ubicacion; #imagen; #reservado;

    constructor(id, nombre, fecha, ubicacion, imagen) {
        this.#id = id; this.#nombre = nombre; this.#fecha = fecha;
        this.#ubicacion = ubicacion; this.#imagen = imagen; this.#reservado = false;
    }

    get id() { return this.#id; }
    get nombre() { return this.#nombre; }
    get fecha() { return this.#fecha; }
    get ubicacion() { return this.#ubicacion; }
    get imagen() { return this.#imagen; }
    get reservado() { return this.#reservado; }

    alternarReserva() { this.#reservado = !this.#reservado; return this.#reservado; }
}

const baseDatos = [
    new EventoCompra(1, 'Paulo Londra: Next Rounds', '29 de Agosto', 'Estadio Nacional', 'img/paulo londra.jpg'),
    new EventoCompra(2, 'Ricky Martin Live', '10 de Septiembre', 'Costa 21', 'img/ricky marti.jpg'),
    new EventoCompra(3, 'Chyno y Nacho: Radio Venezuela Tour', '09 de Octubre', 'Costa 21', 'img/chino y nacho.jpg'),
    new EventoCompra(4, 'Orquesta Sinfónica Nacional del Perú', '07 de Agosto', 'Gran Teatro Nacional', 'img/orquesta sinfonica.png'),
    new EventoCompra(5, 'Las Aventuras de Mario y Luigi', 'Todos los Domingos', 'C.C. Jesús María', 'img/mario.png'),
    new EventoCompra(6, 'Hablando Huevadas: Amor y Odio', 'Temporada en Vivo', 'Teatro Canout', 'img/hablando wbds.jpg'),
    new EventoCompra(7, 'Fútbol Fest X', 'Evento Deportivo', 'Deporplaza', 'img/fubol fest.jpg')
];

document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-teleticket');
    const idSeleccionado = parseInt(localStorage.getItem('eventoSeleccionado'));
    const evento = baseDatos.find(e => e.id === idSeleccionado);

    if (!evento) {
        contenedor.innerHTML = `<h2 style="color:#fff; text-align:center;">Evento no encontrado</h2><p style="text-align:center;"><a href="index.html" style="color:#38bdf8;">Volver a la cartelera</a></p>`;
        return;
    }

    contenedor.innerHTML = `
        <div class="teleticket-main-layout">
            <div class="teleticket-left">
                <div class="teleticket-banner">
                    <img src="${evento.imagen}" alt="${evento.nombre}">
                </div>
                <div class="teleticket-info-block">
                    <h2>${evento.nombre}</h2>
                    <p class="tl-meta">📅 <strong>Fecha oficial:</strong> ${evento.fecha}</p>
                    <p class="tl-meta">📍 <strong>Lugar del evento:</strong> ${evento.ubicacion}</p>
                    <p class="tl-desc">
                        Adquiere tus localidades de manera oficial a través de nuestra ticketera. Selecciona tu zona en el panel lateral. Recuerda descargar tu entrada digital y presentar tu documento de identidad en el ingreso. El proceso se gestiona de forma inmediata en esta app.
                    </p>
                </div>
            </div>
            <div class="teleticket-right">
                <div class="ticket-sales-box">
                    <h3>ZONAS DISPONIBLES</h3>
                    <div class="tl-zone-item active" data-zona="PLATINUM" data-precio="350.00" style="cursor:pointer; border:1px solid #38bdf8; padding:10px; margin-bottom:10px;">
                        <div><strong>🎟️ PLATINUM</strong><br><small>Primer nivel - Numerado</small></div>
                        <span>S/ 350.00</span>
                    </div>
                    <div class="tl-zone-item" data-zona="VIP" data-precio="220.00" style="cursor:pointer; border:1px solid transparent; padding:10px; margin-bottom:10px;">
                        <div><strong>🎟️ VIP</strong><br><small>Segundo nivel - Preferencial</small></div>
                        <span>S/ 220.00</span>
                    </div>
                    <div class="tl-zone-item" data-zona="GENERAL" data-precio="110.00" style="cursor:pointer; border:1px solid transparent; padding:10px; margin-bottom:10px;">
                        <div><strong>🎟️ GENERAL</strong><br><small>Campo y tribuna abierta</small></div>
                        <span>S/ 110.00</span>
                    </div>
                    <button id="btnAdquirirTicket" class="btn-comprar-final">
                        COMPRAR PLATINUM - S/ 350.00
                    </button>
                </div>
            </div>
        </div>
    `;

    const zonas = document.querySelectorAll('.tl-zone-item');
    const botonCompra = document.getElementById('btnAdquirirTicket');
    let zonaSeleccionada = "PLATINUM";
    let precioSeleccionado = "350.00";

    zonas.forEach(zona => {
        zona.addEventListener('click', () => {
            zonas.forEach(z => {
                z.classList.remove('active');
                z.style.borderColor = 'transparent';
            });
            zona.classList.add('active');
            zona.style.borderColor = '#38bdf8';

            zonaSeleccionada = zona.getAttribute('data-zona');
            precioSeleccionado = zona.getAttribute('data-precio');

            if (!evento.reservado) {
                botonCompra.textContent = `COMPRAR ${zonaSeleccionada} - S/ ${precioSeleccionado}`;
            }
        });
    });

    botonCompra.addEventListener('click', () => {
        const estadoReserva = evento.alternarReserva();
        
        if (estadoReserva) {
            alert(`¡Excelente! Entrada registrada exitosamente para la zona ${zonaSeleccionada} de: "${evento.nombre}". Total: S/ ${precioSeleccionado}.`);
            botonCompra.textContent = 'CANCELAR COMPRA / RESERVA';
            botonCompra.classList.add('cancelar');
        } else {
            alert(`Reserva liberada para: "${evento.nombre}".`);
            botonCompra.textContent = `COMPRAR ${zonaSeleccionada} - S/ ${precioSeleccionado}`;
            botonCompra.classList.remove('cancelar');
        }
    });
});