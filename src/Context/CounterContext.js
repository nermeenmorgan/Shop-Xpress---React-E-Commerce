import { createContext, useState } from "react";
export let CounterContext= createContext()
export function CounterContextProvider ({children}){
return <CounterContextProvider>
    {children}
</CounterContextProvider>
}