import { createContext, useState, useEffect } from "react";

export const ThemContext = createContext();

export function ThemProvider({children}){
    const [theme , setTheme] = useState("light");

    const toggleTheme = () =>  {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        document.documentElement.className = theme;
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemContext.Provider value={{theme , toggleTheme}}>
            <div className={theme}>
                {children}
            </div>
        </ThemContext.Provider>
    );
}