import React, {
    Context,
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {useNuiEvent} from "../hooks/useNuiEvent";
import {fetchNui} from "../utils/fetchNui";
import {isEnvBrowser} from "../utils/misc";

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

interface VisibilityProviderValue {
    setOpen: (isOpen: boolean) => void;
    isOpen: boolean;
}

export const VisibilityProvider: React.FC<{children: React.ReactNode}> = ({
    children
}) => {
    const [isOpen, setOpen] = useState(false);

    useNuiEvent<boolean>("setMailboxOpen", setOpen);

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (["Backspace", "Escape"].includes(e.code)) {
                if (!isEnvBrowser()) {
                    fetchNui("onCloseMailbox");
                    setOpen(false);
                }
                // else ;
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    }, [isOpen]);

    return (
        <VisibilityCtx.Provider
            value={{
                isOpen,
                setOpen
            }}
        >
            <div
                className={`fade-${isOpen ? "enter" : "exit"} ${
                    isOpen ? "fade-enter-active" : "fade-exit-active"
                }`}
                style={{
                    height: "100%"
                }}
            >
                {children}
            </div>
        </VisibilityCtx.Provider>
    );
};

export const useVisibility = () =>
    useContext<VisibilityProviderValue>(
        VisibilityCtx as Context<VisibilityProviderValue>
    );
