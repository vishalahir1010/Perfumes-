import { createContext, useState } from "react";

    
    export const ThemContext = createContext();
    export function ThemProvider({children}){
        const [theme , setTheme] = useState("light")

        const toggleTheme = () =>  {
            setTheme(prev=>(prev === "light" ? "dark" : "light"))
        }
        return(
                <ThemContext.Provider value={{theme , toggleTheme}}>
                    <div className={theme}>
                        {children}
                    </div>
                </ThemContext.Provider>
        )
    }