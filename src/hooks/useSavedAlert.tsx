import { useState, useEffect, useCallback } from 'react';
import { flowKey } from '../App';

export const useSavedAlert = (rfInstance: any) => {
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const onSave = useCallback(() => {
        if (rfInstance) {
            // @ts-ignore
            const flow = rfInstance.toObject() as any; // Ts does not see onInit method to set rfInstance
            localStorage.setItem(flowKey, JSON.stringify(flow));
            setShowAlert(true);
        }
    }, [rfInstance]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                onSave()
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false);
                }, 5000);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [rfInstance]);

    return {
        showAlert,
        setShowAlert,
        onSave
    }
}