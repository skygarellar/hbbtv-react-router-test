import { useEffect } from "react";
import useNavigator from "../hooks/useNavigator";
import type { PageProps } from "../types";
import { logger } from "../utils";
import ContainerComp from "./Container";

const Page: React.FC<PageProps> = ({ name, children, keysRemapping = {}, handler = {} }) => {

    const { setActivePage, setActiveContainer } = useNavigator(name);
    
    useEffect(() => {
        logger.debug(`Page component mounted: ${name}`);
        setActivePage(name);
        setActiveContainer(name);

        /**
        * se presente, caricherei lo stato della pagina precedentemente salvato
        */
        return () => {    
            // Qui dovremmo mettere la logica che salvi lo stato dell'app
        }
        
    }, [name, setActivePage, setActiveContainer]);
    
    return(
        <ContainerComp id={name} keysRemapping={keysRemapping} handler={handler}>{ children }</ContainerComp>
    )
};

export default Page;