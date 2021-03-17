import { useCallback, useState } from "react";
import { isEmptyObject } from "../../utilities/utilities";

function useFetch(url, options) {
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchRequest = useCallback(async (callbackURL, callbackOptions) => {
        const fetchOptions = Object.assign({}, options, callbackOptions);
        const fetchURL = url || callbackURL;

        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(fetchURL, fetchOptions);
            const resultObj = await ((fetchOptions.responseType === "text") ? response.text() : response.json());

            const hasError = (resultObj && resultObj.hasError);

            if (hasError || isEmptyObject(resultObj)) {
                const errorMessage = resultObj.message || "couldn't get response";
                setError(errorMessage);
                setData(null);
                return { hasError: true, error: errorMessage };
            }
            setData(resultObj);
            setError(null);
            return { data: resultObj };
        } catch (e) {
            setError("Error during fetching data: " + e.message);
            setData(null);
            return { hasError: true, error: "Error during fetching data: " + e.message };
        } finally {
            setIsLoading(false);
        }

    }, [url, options]);

    return { fetchRequest, data, error, isLoading };
}


export default useFetch;