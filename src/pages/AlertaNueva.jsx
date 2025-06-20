import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { FormularioConsulta } from "../components/FormularioConsulta";

export const AlertaNueva = () => {
  const { id } = useParams(); // Puede ser undefined
  const navigate = useNavigate();
  const usuario = { nombre: "Docente Demo", rol: "Docente" };

  return (
    <div className="flex h-screen overflow-hidden">
  
      <Sidebar />

    
      <div className="flex-1 flex flex-col ml-64">
    
        <Header nombre={usuario.nombre} rol={usuario.rol} />

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Nueva Alerta</h2>
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:underline"
            >
              Volver
            </button>
          </div>

          <FormularioConsulta idEstudiante={id} />
        </main>
      </div>
    </div>
  );
};
