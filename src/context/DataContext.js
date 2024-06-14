import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [observatorioData, setObservatorioData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("observatorioData"));
    if (storedData) {
      setObservatorioData(storedData);
    }
  }, []);

  const setObsData = (newData) => {
    setObservatorioData(newData);
    localStorage.setItem("observatorioData", JSON.stringify(newData));
  };

  const contextValue = {
    observatorioData,
    setObsData,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
