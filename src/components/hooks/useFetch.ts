'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import {cache, useEffect, useState} from 'react';

const useFetch = (url: string, options: RequestInit = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const fetchData = cache(async () => {
        try {
            const res = await fetch(url, {...options});
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const json = await res.json();
            setResponse(json);
            setLoaded(true);
        } catch (error: any ) {
            setError(error);
            setLoaded(true);
        }
    });
    fetchData();
  }, [url, options, loaded]);

  return { response, error, loaded, reload: (val: boolean)=>setLoaded(!val) };
};

export default useFetch;