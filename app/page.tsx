"use client"; // Directiva para componentes del cliente

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const responses = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/todos/1"),
        fetch("https://jsonplaceholder.typicode.com/todos/2"),
        fetch("https://jsonplaceholder.typicode.com/todos/3"),
      ]);

      // Convertir las respuestas a formato JSON
      const data = await Promise.all(responses.map(response => response.json()));

      // Guardamos los datos de los todos en el estado
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Cargar los todos al iniciar
  }, []);

  return (
    <div className="min-h-screen p-8 flex flex-col">
      {/* Encabezado */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={50}
            height={50}
          />
          <h1 className="ml-4 text-2xl font-bold">CONTROL</h1>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {todos.map(todo => (
            <div key={todo.id} className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow">
              <h3 className="text-lg font-bold">Todo #{todo.id}</h3>
              <p className="mt-2 text-center">{todo.title}</p>
              <p className="mt-2 text-center">{todo.completed ? "✔️ Completado" : "❌ No completado"}</p>
              <button 
                className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                onClick={fetchTodos} // Actualizar todos al hacer clic
              >
                Actualizar
              </button>
            </div>
          ))}
        </section>
      </main>

      {/* Pie de página */}
      <footer className="mt-8 py-4 text-center border-t">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} PV - CONTROL. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
