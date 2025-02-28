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

// This should be mounted at the top level of your application, it is currently set to
// apply a CSS visibility value. If this is non-performant, this should be customized.
export const VisibilityProvider: React.FC<{children: React.ReactNode}> = ({
    children
}) => {
    const [isOpen, setOpen] = useState(false);

    useNuiEvent<boolean>("setOpen", setOpen);

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (["Backspace", "Escape"].includes(e.code)) {
                if (!isEnvBrowser()) fetchNui("onClose");
            } else setOpen(!isOpen);
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
                style={{
                    visibility: isOpen ? "visible" : "hidden",
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
