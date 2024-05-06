import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const CitiesContext = createContext();

const Base_URL = "http://localhost:3000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState([]);

  useEffect(function () {
    async function fetchcities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${Base_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchcities();
  }, []);

  async function getcities(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${Base_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function CreateCities(newCities) {
    try {
      setIsLoading(true);
      const response = await fetch(`${Base_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCities),
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
          // Add other headers if necessary
        },
      });
      const data = await response.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function DeleteCities(id) {
    try {
      setIsLoading(true);
      await fetch(`${Base_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id)); // Corrected filter condition
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getcities,
        CreateCities,
        DeleteCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("provider use out of the box");
  return context;
}
export { CitiesProvider, useCities };
