import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Dialog } from '@headlessui/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Icons
import { FaJs, FaReact, FaNodeJs, FaGitAlt, FaEnvelope, FaGithub, FaLinkedin, FaTimes, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiTauri, SiElectron, SiVite, SiCapacitor, SiExpress, SiPnpm } from 'react-icons/si';

// --- Interfaces ---
interface Project {
  name: string;
  category: string;
  description: string;
  tech: string[];
  link?: string;
  images: string[];
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: string;
  category: string;
}

// --- Data ---
const skills: Skill[] = [
  { name: "React", icon: <FaReact />, level: "Experto", category: "Frontend" },
  { name: "TypeScript", icon: <SiTypescript />, level: "Alto", category: "Frontend" },
  { name: "Tailwind", icon: <SiTailwindcss />, level: "Experto", category: "Frontend" },
  { name: "JavaScript", icon: <FaJs />, level: "Experto", category: "Frontend" },
  { name: "Node.js", icon: <FaNodeJs />, level: "Intermedio", category: "Backend" },
  { name: "Express", icon: <SiExpress />, level: "Intermedio", category: "Backend" },
  { name: "Tauri", icon: <SiTauri />, level: "Intermedio", category: "Desktop/Mobile" },
  { name: "Vite", icon: <SiVite />, level: "Experto", category: "Frontend" }, // Agrupado en Frontend o Tools
  { name: "Git", icon: <FaGitAlt />, level: "Experto", category: "Frontend" },
  { name: "pnpm", icon: <SiPnpm />, level: "Alto", category: "Frontend" },
  { name: "Electron", icon: <SiElectron />, level: "Intermedio", category: "Desktop/Mobile" },
  { name: "Capacitor", icon: <SiCapacitor />, level: "Intermedio", category: "Desktop/Mobile" },
];

const projects: Project[] = [
  {
    name: "NexoDent",
    category: "Software de Gestión",
    description: "Desarrollé una aplicación multiplataforma para la gestión integral de clínicas odontológicas. Implementé una arquitectura moderna utilizando Tauri y Rust para garantizar rendimiento nativo, con una interfaz escalable en React y TypeScript. Gestioné el almacenamiento y sincronización de datos agregando soluciones en la nube (Supabase/PostgreSQL) y locales.",
    tech: ["Tauri v2", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    images: [
      "/Projects/NexoDent/1.png",
      "/Projects/NexoDent/2.png",
      "/Projects/NexoDent/3.png",
      "/Projects/NexoDent/4.png",
      "/Projects/NexoDent/5.png",
      "/Projects/NexoDent/6.png",
      "/Projects/NexoDent/7.png",
      "/Projects/NexoDent/8.png",
      "/Projects/NexoDent/9.png",
      "/Projects/NexoDent/10.png",
      "/Projects/NexoDent/11.png"
    ]
  },
  {
    name: "OneInventory",
    category: "Full Stack App",
    description: "Sistema Full Stack desde cero para el control y administración de inventarios. Desarrollé una API RESTful robusta con Node.js y Express.js, manejando la persistencia de datos con SQLite3. Para el cliente, diseñé una interfaz intuitiva y fuertemente tipada utilizando React, TypeScript y Tailwind.",
    tech: ["React", "TypeScript", "Node.js", "Express", "SQLite3"],
    images: [
      "/Projects/OneInventory/1.png",
      "/Projects/OneInventory/2.png",
      "/Projects/OneInventory/3.png",
      "/Projects/OneInventory/4.png",
      "/Projects/OneInventory/5.png",
      "/Projects/OneInventory/6.png",
      "/Projects/OneInventory/7.png",
      "/Projects/OneInventory/8.png",
      "/Projects/OneInventory/9.png",
      "/Projects/OneInventory/10.png",
      "/Projects/OneInventory/11.png",
      "/Projects/OneInventory/12.png"
    ]
  },
  {
    name: "Renewed Player",
    category: "Desktop App",
    description: "Reproductor de música de escritorio personalizado, construido con tecnologías web empaquetadas en una aplicación ligera y de bajo consumo de recursos (Tauri). Enfocado en el uso de UI/UX fluida y con diseños muy avanzados.",
    tech: ["React", "Tauri", "Tailwind CSS"],
    images: [
      "/Projects/RenewedPlayer/1.png",
      "/Projects/RenewedPlayer/2.png",
      "/Projects/RenewedPlayer/3.png"
    ]
  },
  {
    name: "The Zero Point Project",
    category: "Plataforma Educativa",
    description: "Repositorio centralizado de contenido educativo para primaria y secundaria, construido con React y Vite para tiempos de renderizado ultrarrápidos, apoyado por un backend potente en Node.js para la gestión concurrente.",
    tech: ["React", "Vite", "Node.js"],
    link: "https://zero-point-project.vercel.app/creator",
    images: [
      "/Projects/ZeroPoint/1.png",
      "/Projects/ZeroPoint/2.png",
      "/Projects/ZeroPoint/3.png",
      "/Projects/ZeroPoint/4.png",
      "/Projects/ZeroPoint/5.png",
      "/Projects/ZeroPoint/6.png",
      "/Projects/ZeroPoint/7.png",
      "/Projects/ZeroPoint/8.png",
      "/Projects/ZeroPoint/9.png",
      "/Projects/ZeroPoint/10.png"
    ]
  }
];

// --- Components ---

const Background = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-600/10 blur-[120px]" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-600/10 blur-[150px]" />
    <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-fuchsia-600/10 blur-[100px]" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
  </div>
);

const Navbar = () => (
  <motion.nav
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 mix-blend-difference pointer-events-none"
  >
    <div className="text-2xl font-black tracking-tighter text-white uppercase group relative pointer-events-auto cursor-pointer">
      Luis Velásquez<span className="text-cyan-400">.</span>
    </div>
    <a
      href="mailto:Luiscvr05@gmail.com"
      className="relative overflow-hidden rounded-full p-[1px] group hidden md:block pointer-events-auto"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500 animate-spin-slow rounded-full opacity-70 group-hover:opacity-100 transition-opacity" />
      <div className="bg-[#050505] px-6 py-2 rounded-full relative group-hover:bg-transparent transition-colors duration-300">
        <span className="text-sm font-medium tracking-wide text-white group-hover:text-black transition-colors duration-300">
          Disponible para trabajar
        </span>
      </div>
    </a>
  </motion.nav>
);

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <motion.section
      style={{ y: y1, opacity }}
      className="relative z-10 min-h-screen flex flex-col justify-center pt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-cyan-400 font-mono text-sm md:text-base mb-6 tracking-widest uppercase flex items-center gap-4">
          <span className="w-12 h-[1px] bg-cyan-400/50"></span>
          Ingeniería en Informática
        </p>
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-white overflow-hidden mb-8">
          <span className="block hover:translate-x-4 transition-transform duration-500">CREATIVE</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-400 block hover:translate-x-4 transition-transform duration-500 delay-75">
            DEVELOPER.
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-24 items-end mt-12 w-full max-w-5xl">
          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed">
            Soy <span className="text-white font-semibold">Luis Velásquez</span>. Diseño y desarrollo experiencias digitales vanguardistas, enfocándome en interfaces web fluidas, aplicaciones multiplataforma y un rendimiento impecable.
          </p>
          <div className="flex gap-6 items-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2"
            >
              Explorar Obras <FaExternalLinkAlt className="text-xs" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

const BentoSkills = () => {
  const categories = ["Todos", "Frontend", "Backend", "Desktop/Mobile"];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredSkills = activeCategory === "Todos"
    ? skills
    : skills.filter(s => s.category === activeCategory);

  // Funciones para asignar color al badge
  const getBadgeColor = (level: string) => {
    switch (level) {
      case "Experto": return "bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white shadow-[0_0_10px_rgba(217,70,239,0.3)]";
      case "Alto": return "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]";
      case "Intermedio": return "bg-white/10 text-gray-300 border border-white/20";
      default: return "bg-white/10 text-gray-300 border border-white/20";
    }
  };

  return (
    <section className="py-24 md:py-32 relative z-10 w-full min-h-[80vh]" id="skills">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
            ARSENAL<span className="text-violet-500">.</span>
          </h2>
          <p className="text-gray-400 font-light text-lg">Tecnologías y herramientas que dominan mi flujo de trabajo.</p>
        </div>

        {/* Animated Filter Switch */}
        <div className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-2xl border border-white/10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2 rounded-xl text-sm font-semibold transition-colors z-10 ${activeCategory === cat ? 'text-black' : 'text-gray-400 hover:text-white'
                }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-white rounded-xl -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[140px]">
        <AnimatePresence mode='popLayout'>
          {filteredSkills.map((skill, index) => {
            // Dynamic Spanning Layout Logic (se reinicia pero es dinámico visualmente)
            const isLarge = index === 0 && activeCategory === "Todos";
            const isTall = (index === 2 || index === 7) && activeCategory === "Todos";
            const isWide = (index === 4 || index === 9) && activeCategory === "Todos";

            return (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, type: "spring" }}
                className={`
                  group relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 flex flex-col justify-between overflow-hidden hover:bg-white/[0.05] transition-colors hover:border-white/[0.1]
                  ${isLarge ? 'col-span-2 row-span-2' : ''}
                  ${isTall ? 'col-span-2 md:col-span-1 row-span-2' : ''}
                  ${isWide ? 'col-span-2' : ''}
                  ${!isLarge && !isTall && !isWide ? 'col-span-2 md:col-span-1' : ''}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex justify-between items-start">
                  <div className={`text-white/40 group-hover:text-cyan-400 transform group-hover:scale-110 transition-all duration-300 origin-top-left ${isLarge ? 'text-6xl' : 'text-4xl'}`}>
                    {skill.icon}
                  </div>
                  {/* Badge de Nivel */}
                  <div className={`text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${getBadgeColor(skill.level)} transition-all`}>
                    {skill.level}
                  </div>
                </div>

                <div className="z-10 mt-auto pt-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className={`font-bold text-white tracking-wide ${isLarge ? 'text-2xl' : 'text-lg'}`}>
                    {skill.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {skill.category}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string, idx: number, images: string[] } | null>(null);

  const openLightbox = (images: string[], idx: number) => {
    setLightboxImage({ src: images[idx], idx, images });
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxImage) {
      const nextIdx = (lightboxImage.idx + 1) % lightboxImage.images.length;
      setLightboxImage({ src: lightboxImage.images[nextIdx], idx: nextIdx, images: lightboxImage.images });
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxImage) {
      const prevIdx = lightboxImage.idx === 0 ? lightboxImage.images.length - 1 : lightboxImage.idx - 1;
      setLightboxImage({ src: lightboxImage.images[prevIdx], idx: prevIdx, images: lightboxImage.images });
    }
  };

  return (
    <section className="py-32 relative z-10 w-full" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
      >
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
            PROYECTOS<span className="text-cyan-400">.</span>
          </h2>
          <p className="text-gray-400 font-light text-lg max-w-md">Soluciones de software construidas con arquitectura limpia y diseño de alto impacto visual.</p>
        </div>
        <div className="font-mono text-sm text-gray-500 uppercase flex flex-col md:items-end">
          <span>{projects.length < 10 ? `0${projects.length}` : projects.length} Proyectos</span>
          <span className="text-cyan-400/70">Selección Destacada</span>
        </div>
      </motion.div>

      <div className="space-y-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="group relative block w-full bg-[#080808] border border-white/[0.05] hover:border-white/10 rounded-[2.5rem] p-8 md:p-14 overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-[0_0_80px_rgba(34,211,238,0.05)]"
            onClick={() => setSelected(project)}
          >
            {/* Integrated Skewed Background Previews */}
            <div className="absolute inset-x-0 inset-y-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-full md:w-[75%] opacity-40 group-hover:opacity-100 transition-all duration-1000 ease-in-out flex">
                {project.images && project.images.length > 0 && (
                  <div className="flex h-full w-full transform -skew-x-12 translate-x-16 border-l border-white/5">
                    {project.images.slice(0, 3).map((img, i) => (
                      <div key={i} className="flex-1 h-full border-r border-white/5 overflow-hidden relative bg-[#111]">
                        <motion.img
                          initial={false}
                          src={img}
                          className="absolute inset-0 h-full w-full object-cover skew-x-12 scale-[1.5] grayscale group-hover:grayscale-0 transition-all duration-1000"
                          alt="Project Slice"
                          onError={() => {
                            console.log('Img loading quirk or error on:', img);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Fade Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent z-10" />
            </div>

            <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-8 h-full">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-mono px-4 py-1.5 rounded-full border border-white/10 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all bg-white/5 uppercase tracking-widest font-bold">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 transition-all duration-500">
                  {project.name}
                </h3>
                <p className="text-gray-400 max-w-lg text-lg leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 line-clamp-2 md:line-clamp-none">
                  {project.description}
                </p>
              </div>

              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black transition-all duration-500 shrink-0 transform group-hover:rotate-45 group-hover:scale-110 shadow-2xl">
                <FaExternalLinkAlt size={24} />
              </div>
            </div>

            {/* Bottom Tech Marquee */}
            <div className="relative z-20 w-full overflow-hidden mt-8 max-h-0 group-hover:max-h-24 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out hidden lg:block border-t border-white/5 pt-8">
              <div className="flex gap-12 animate-marquee whitespace-nowrap mask-image-fade">
                {project.tech.map(t => (
                  <span key={t} className="text-4xl font-black text-white/5 uppercase italic tracking-tighter hover:text-white/20 transition-colors cursor-default">{t}</span>
                ))}
                {project.tech.map(t => (
                  <span key={t + "-2"} className="text-4xl font-black text-white/5 uppercase italic tracking-tighter hover:text-white/20 transition-colors cursor-default">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <Dialog
            static
            as={motion.div}
            open={!!selected}
            onClose={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-2xl"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-14 shadow-2xl overflow-y-auto max-h-[90vh] flex flex-col"
            >
              <div className="absolute top-[-20%] right-[-10%] w-[30vh] h-[30vh] rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors z-20"
              >
                <FaTimes size={20} />
              </button>

              <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-12">
                {/* Info Lateral */}
                <div>
                  <div className="mb-6 inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-mono tracking-widest uppercase">
                    {selected.category}
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                    {selected.name}
                  </h3>

                  {selected.link && (
                    <a href={selected.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-2 mb-8 bg-white/10 hover:bg-white text-white hover:text-black rounded-full font-bold transition-colors">
                      Visitar Proyecto <FaExternalLinkAlt size={14} />
                    </a>
                  )}

                  <div className="text-gray-400 font-light leading-relaxed mb-10 text-base md:text-lg border-l-[3px] border-violet-500/50 pl-5 space-y-4">
                    <p>{selected.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">Stack Tecnológico</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.tech.map(t => (
                        <span key={t} className="px-4 py-2 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Galería de Imágenes */}
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 min-h-[300px]">
                  <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Galería Visual</h4>
                  {selected.images && selected.images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                      {selected.images.map((img, i) => (
                        <div
                          key={i}
                          className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border border-white/10 hover:border-cyan-500/50 transition-colors"
                          onClick={() => openLightbox(selected.images, i)}
                        >
                          <img src={img} alt={`${selected.name} preview ${i}`} className="w-full h-full object-cover filter brightness-75 group-hover:brightness-110 group-hover:scale-105 transition-all duration-500" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold text-white px-3 py-1 bg-white/20 backdrop-blur-md rounded-full">AMPLIAR</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[200px] text-gray-600 font-mono italic">
                      <p>Aún no hay imágenes disponibles para este proyecto.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox */}
      {createPortal(
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 select-none"
              onClick={closeLightbox}
            >
              <button onClick={closeLightbox} className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/20 p-4 rounded-full z-[10000]">
                <FaTimes size={24} />
              </button>

              <button onClick={prevImage} className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/20 p-4 rounded-full z-[10000]">
                <FaChevronLeft size={24} />
              </button>

              <motion.img
                key={lightboxImage.src}
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={lightboxImage.src}
                alt="Vista ampliada"
                className="max-h-[90vh] max-w-full object-contain rounded-xl shadow-[0_0_100px_rgba(255,255,255,0.05)]"
                onClick={(e) => e.stopPropagation()}
              />

              <button onClick={nextImage} className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/20 p-4 rounded-full z-[10000]">
                <FaChevronRight size={24} />
              </button>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-mono text-sm px-6 py-2 bg-white/10 rounded-full backdrop-blur-md z-[10000]">
                {lightboxImage.idx + 1} / {lightboxImage.images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

const ExperienceAndAbout = () => {
  return (
    <section className="py-32 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8">
          EL CREADOR<span className="text-fuchsia-500">.</span>
        </h2>
        <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
          <p>
            Soy <span className="text-white font-medium">Luis Velásquez</span>, un ingeniero en formación y desarrollador de software con una obsesión por lo estético y lo funcional. A lo largo de mi carrera, he fusionado el diseño vanguardista con arquitecturas robustas.
          </p>
          <p>
            Actualmente radicado en Cumaná, Venezuela. Mi trayectoria académica en la Universidad Politécnica Territorial del Oeste de Sucre me ha dotado de bases sólidas en algoritmia y estructuras de datos, mientras que mi curiosidad me mantiene en la élite tecnológica (React, Node.js, Rust con Tauri).
          </p>
          <p className="border-l-[3px] border-fuchsia-500/50 pl-5 text-gray-300 italic">
            "Mi objetivo: construir sistemas que no solo funcionen de forma rápida y escalable, sino que también cuenten una historia visual inmersiva."
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Timeline Line */}
        <div className="absolute left-[24px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-400 via-violet-400 to-transparent" />

        <div className="space-y-12">
          {[{
            title: "Desarrollador Independiente",
            date: "2023 - Presente",
            desc: "Creación de aplicaciones Full Stack y multiplataforma, optimizando el rendimiento y diseñando interfaces de nueva generación.",
            color: "shadow-cyan-400 bg-cyan-400"
          }, {
            title: "Ingeniería en Informática",
            date: "2024 - Presente",
            desc: "Formación académica avanzada en ciencias de la computación, algoritmos e ingeniería de software estructurada en la UPTOS.",
            color: "shadow-violet-400 bg-violet-400"
          }, {
            title: "Desarrollo y Arquitectura Web",
            date: "2025",
            desc: "Dominio de ecosistemas modernos: React, Node.js y flujos de integración en el más alto nivel.",
            color: "shadow-fuchsia-400 bg-fuchsia-400"
          }].map((item, i) => (
            <div key={i} className="relative pl-16 group">
              {/* Dot */}
              <div className={`absolute left-[19px] top-[10px] w-3 h-3 rounded-full ${item.color} shadow-[0_0_15px_currentColor] group-hover:scale-150 transition-transform duration-300`} />

              <div className="text-sm font-mono text-gray-500 mb-2">{item.date}</div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

const Contact = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-32 relative z-10 w-full text-center"
    >
      <div className="max-w-4xl mx-auto border border-white/10 bg-white/[0.02] p-12 md:p-24 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none opacity-50" />
        <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 blur-[150px] pointer-events-none rounded-full group-hover:bg-violet-500/30 transition-colors duration-700" />

        <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter relative z-10 leading-[0.9]">
          INICIEMOS UN <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 block mt-2 pb-4">PROYECTO</span>.
        </h2>
        <p className="text-lg md:text-2xl text-gray-400 font-light mb-12 relative z-10 max-w-2xl mx-auto">
          Abierto a oportunidades de tiempo completo, proyectos freelance y colaboraciones creativas de gran escala.
        </p>

        <a
          href="mailto:Luiscvr05@gmail.com"
          className="relative inline-block px-12 py-6 bg-white text-black font-black text-xl rounded-full hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-500 z-10 group-hover:bg-cyan-50"
        >
          CONTACTAR AHORA
        </a>
      </div>
    </motion.section>
  )
}

const Footer = () => (
  <footer className="relative z-10 border-t border-white/5 bg-[#030303] py-16 text-center text-gray-500 text-sm flex flex-col items-center">
    <div className="flex gap-8 mb-10">
      <a href="https://github.com/LGamer0" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all hover:scale-110 p-4 rounded-full bg-white/5 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        <FaGithub size={24} />
      </a>
      <a href="https://www.linkedin.com/in/luisvelasquezdev/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all hover:scale-110 p-4 rounded-full bg-white/5 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        <FaLinkedin size={24} />
      </a>
      <a href="mailto:Luiscvr05@gmail.com" className="text-gray-500 hover:text-white transition-all hover:scale-110 p-4 rounded-full bg-white/5 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
        <FaEnvelope size={24} />
      </a>
    </div>
    <div className="font-mono uppercase tracking-widest text-xs opacity-70">
      &copy; {new Date().getFullYear()} Luis Velásquez. <br className="md:hidden mt-2" /> Todos los derechos reservados.
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      <Background />
      <Navbar />
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <Hero />
        <BentoSkills />
        <Projects />
        <ExperienceAndAbout />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App;