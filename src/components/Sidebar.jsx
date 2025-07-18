import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Home,
  LogOut,
  Users,
  AlertTriangle,
  BarChart4,
  User,
  FileText,
  UserCog,
  CalendarDays,
  UserPlus,
} from "lucide-react";

import { SidebarItem } from "./SidebarItem";
import logo from "../assets/alertas-logo.png";
import { UserContext } from "../context/UserContext";

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario } = useContext(UserContext);

  const [ancho, setAncho] = useState(window.innerWidth);
  const esMovil = ancho < 640;
  const esTablet = ancho >= 640 && ancho < 1024;
  const esEscritorio = ancho >= 1024;

  useEffect(() => {
    const manejarResize = () => setAncho(window.innerWidth);
    window.addEventListener("resize", manejarResize);
    return () => window.removeEventListener("resize", manejarResize);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login", { replace: true });
  };

  const itemsDocente = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: Users, label: "Estudiantes", path: "/estudiantes" },
    { icon: AlertTriangle, label: "Alertas", path: "/consultas" },
    { icon: BarChart4, label: "Estadísticas", path: "/estadisticas" },
  ];

  const itemsAdmin = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: Users, label: "Estudiantes", path: "/estudiantes" },
    { icon: UserPlus, label: "Docentes", path: "/docentes" },
    { icon: UserCog, label: "Psicorientadores", path: "/psicos" },
    { icon: AlertTriangle, label: "Alertas", path: "/consultas" },
    { icon: CalendarDays, label: "Citas", path: "/citas" },
    { icon: FileText, label: "Seguimientos", path: "/seguimientos" },
    { icon: BarChart4, label: "Estadísticas", path: "/estadisticas" },
  ];

  const itemsPsico = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: CalendarDays, label: "Citas", path: "/citas" },
    { icon: AlertTriangle, label: "Alertas", path: "/consultas" },
    { icon: FileText, label: "Seguimientos", path: "/seguimientos" },
    { icon: BarChart4, label: "Estadísticas", path: "/estadisticas" },
  ];

  const itemsEstudiante = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: AlertTriangle, label: "Alertas", path: "/mis-alertas" },
    { icon: CalendarDays, label: "Citas", path: "/citas" },
  ];

  const comunes = [
    { icon: User, label: "Perfil", path: "/perfil" }, // SIEMPRE visible
    { icon: LogOut, label: "Cerrar sesión", path: "/login", ocultarEnMovil: true },
  ];

  let items = [];

  if (usuario.rol === 0) {
    items = [...itemsDocente, ...comunes];
  } else if (usuario.rol === 2) {
    items = [...itemsPsico, ...comunes];
  } else if (usuario.rol === 1) {
    items = [...itemsEstudiante, ...comunes];
  } else if (usuario.rol === 3) {
    items = [...itemsAdmin, ...comunes];
  }

  const tipoLayout = esEscritorio ? "vertical" : "horizontal";

  return (
    <aside
      className={`
        ${tipoLayout === "vertical"
          ? "fixed top-0 left-0 w-64 h-screen flex-col"
          : "fixed top-0 left-0 right-0 h-16 flex-row"}
        bg-pink-500 text-white flex z-50 items-center
        px-2
      `}
    >
      {tipoLayout === "vertical" && (
        <div className="h-16 flex items-center justify-center mb-4 w-full">
          <img src={logo} alt="Logo Alertas" className="h-10" />
        </div>
      )}

      <div
        className={`flex-1 ${
          tipoLayout === "horizontal"
            ? "flex justify-evenly items-center w-full"
            : "space-y-4 w-full"
        }`}
      >
        {items.map((item, i) => {
          if ((esMovil || esTablet) && item.ocultarEnMovil) return null;

          const handleClick = () => {
            if (item.label === "Cerrar sesión") {
              cerrarSesion();
            } else {
              navigate(item.path);
            }
          };

          return (
            <div key={i} onClick={handleClick}>
              <SidebarItem
                icon={item.icon}
                label={
                  tipoLayout === "vertical"
                    ? item.label
                    : esTablet
                      ? item.label
                      : ""
                }
                path={item.path}
                active={
                  location.pathname === item.path ||
                  (item.path !== "/" && location.pathname.startsWith(item.path + "/"))
                }
                soloIcono={esMovil}
                textoHorizontal={esTablet}
              />
            </div>
          );
        })}
      </div>
    </aside>
  );
};
