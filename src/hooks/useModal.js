import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(true);

    const toggle = () => {
        setIsShowing(false);
    }

    return {
        isShowing,
        toggle,
    }
};

export default useModal;