import { useEffect, useCallback } from 'react';
import { flowKey } from '../App';
import { toast } from 'sonner';

export const useSavedAlert = (rfInstance: any) => {
    const onSave = useCallback(() => {
        if (rfInstance) {
            // @ts-ignore
            const flow = rfInstance.toObject() as any; // Ts does not see onInit method to set rfInstance
            localStorage.setItem(flowKey, JSON.stringify(flow));
            
            toast.success('Your changes have been saved')

        }
    }, [rfInstance]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                onSave()

                toast.success('Your changes have been saved')

            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [rfInstance]);

    return {
        onSave
    }
}