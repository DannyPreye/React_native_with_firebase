import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios(url, {
                ...options,
            });
            setData(response.data);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, JSON.stringify(options)]);

    // const refetch = () => {
    //     fetchData();
    // };

    return { data, error, isLoading };
};

export default useFetch;
