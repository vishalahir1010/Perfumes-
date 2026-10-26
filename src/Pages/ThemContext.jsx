import { useState, useEffect } from "react";
import { ThemContext } from "./ThemContextValue.js";

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