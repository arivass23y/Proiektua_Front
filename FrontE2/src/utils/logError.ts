import { environment } from "src/environments/environment";

const logError = async (
    categoria: string,
    error: unknown,
  ) => {
    let errorMessage: string;
    let errorStack: string;
  
    if (error instanceof Error) {
      errorMessage = error.message || "No message available";
      errorStack = error.stack || "No stack available";
    } else if (typeof error === "string") {
      errorMessage = error;
      errorStack = "No stack available";
    } else {
      errorMessage = "Error desconocido";
      errorStack = "No stack available";
    }
  
    const logData = {
      categoria,
      message: errorMessage,
      level: "error",
      stack: errorStack,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };
  
    try {
      await fetch(`${environment.url}logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });
    } catch (err) {
      console.error("Error al enviar log al backend:", err);
    }
  };
  
  export default logError;
  