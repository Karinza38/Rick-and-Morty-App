import React, { createContext, useContext, useState } from "react";

// Create a context with a default value of empty strings
const CharacterContext = createContext({
    name: "",
    status: "",
    gender: "",
    setName: () => { },
    setStatus: () => { },
    setGender: () => { },
});

// Create a custom hook to use the context
const useCharacterContext = () => useContext(CharacterContext);

// Create a component that provides the context value
const CharacterProvider = ({ children }) => {
    // Use state hooks to store the values
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [gender, setGender] = useState("");

    // Return the provider component with the value prop
    return (
        <CharacterContext.Provider
            value={{ name, status, gender, setName, setStatus, setGender }}
        >
            {children}
        </CharacterContext.Provider>
    );
};

// Export the provider and the custom hook
export { CharacterProvider, useCharacterContext };
