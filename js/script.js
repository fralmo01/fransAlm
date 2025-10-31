document.addEventListener("DOMContentLoaded", function() {

    // Registra el plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // --- Animación del Hero (al cargar) ---
    const heroTimeline = gsap.timeline();
    heroTimeline
        .to(".hero-title", {
            duration: 1.2,
            opacity: 1,
            y: 0,
            ease: "power3.out"
        })
        .to(".hero-subtitle", {
            duration: 1,
            opacity: 1,
            y: 0,
            ease: "power3.out"
        }, "-=0.8"); // Se anima 0.8s antes de que termine la anterior

    // --- Animaciones que se activan con Scroll ---

    // Función genérica para animar secciones
    function animateSection(selector, trigger) {
        gsap.from(selector, {
            scrollTrigger: {
                trigger: trigger,
                start: "top 85%", // Se activa cuando la sección está al 85% desde arriba
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            stagger: 0.2, // Anima elementos uno tras otro
            duration: 0.8,
            ease: "power2.out"
        });
    }

    // Animar títulos de sección
    gsap.utils.toArray('h2.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 40,
            duration: 1
        });
    });

    // Animar secciones específicas
    animateSection("#problem p", "#problem");
    animateSection("#idea .text-content p", "#idea");
    animateSection(".card", ".card-container");
    animateSection(".mission-columns .column", ".mission-columns");
    animateSection(".roadmap-step", ".roadmap-container");
    animateSection(".roadmap-justification", ".roadmap-justification");
    animateSection(".social-icons a", ".social-icons");

    // NUEVO: Animar las imágenes
    gsap.utils.toArray('.section-image').forEach(img => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: (img.closest('.reverse')) ? -50 : 50, // Anima desde la izquierda o derecha
            duration: 1
        });
    });


    // --- Animación sutil de la barra de navegación ---
    gsap.to(".main-nav", {
        scrollTrigger: {
            trigger: "body",
            start: "top top", // Empieza al scrollear 1px
            end: 100,
            scrub: true // Se anima junto con el scroll
        },
        height: "60px", // Encoge la barra de nav
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)" // Añade sombra
    });

    // --- Scroll Suave (Funciona automáticamente con los nuevos enlaces) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                
                window.scrollTo({
                    top: offsetTop - 60, // Resta la altura del nav fijo (ajusta si la altura cambió)
                    behavior: 'smooth'
                });
            }
        });
    });

});