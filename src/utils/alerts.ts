import { useStore } from "@/src/hooks/store";

type AlertStyle = "cancel" | "outline" | "ghost";

export interface ActionProps {
    text: string,
    style?: AlertStyle,
    onPress?: () => void
}

export interface AlertProps {
    title: string;
    description: string;
    actions?: Array<ActionProps>;
}

const INITIAL_STATE = {
    title: "",
    description: "",
}

const [useAlertState, setAlertState] = useStore<AlertProps>(INITIAL_STATE);
const [useAlertOpen, setAlertOpen] = useStore<boolean>(false);

const Alert = {
    alert: (title: string, description: string, actions?: Array<ActionProps>) => {
        setAlertState({ title, description, actions });
        setAlertOpen(true);
    },
};

export { Alert, useAlertOpen, useAlertState, setAlertOpen }