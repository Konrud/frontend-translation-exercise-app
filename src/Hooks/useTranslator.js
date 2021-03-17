import { useCallback, useEffect, useState } from "react";

function useTranslator(basePath) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getTranslator = useCallback(async function getTranslationData(url) {
        try {
            setIsLoading(true);
            const result = await import(basePath + url);
            if (result && result.default) {
                setData(result.default);
                return result.default;
            }
        } catch (e) {
            console.error("error from useTranslator: " + e.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { data, isLoading, getTranslator }
};


export default useTranslator;