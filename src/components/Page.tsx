import { useEffect } from "react";
import useNavigator from "../hooks/useNavigator";
import type { PageProps } from "../types";
import { logger } from "../utils";

const Page: React.FC<PageProps> = ({ name, children }) => {

    const { setActivePage } = useNavigator(name);
    
    useEffect(() => {
        logger.debug(`Page component mounted: ${name}`);
        setActivePage(name);

        /**
        * se presente, caricherei lo stato della pagina precedentemente salvato
        */
        return () => {    
            // Qui dovremmo mettere la logica che salvi lo stato dell'app
        }
        
    }, [name, setActivePage]);
    
    return(
        <>{ children }</>
    )
};

export default Page;