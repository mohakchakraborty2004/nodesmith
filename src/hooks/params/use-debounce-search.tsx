"use client"

import { pagination } from "@/lib/constants";
import { useEffect, useState } from "react";

interface UseDebounceSearchProps <T extends {
    search : string;
    page : number;
}>{
    params : T;
    setParams : (params : T) => void;
    debounceMS : number;
}

export default function useSearch<T extends {
    search : string;
    page : number;
}> ({
    params, 
    setParams,
    debounceMS
} : UseDebounceSearchProps<T>) {

    const [localSearch, setLocalSearch] = useState(params.search)

    useEffect(()=> {
        if (localSearch === "" && params.search !== "") {
            setParams({
                ...params,
                search : "",
                page : pagination.DEFAULT_PAGE
            })
            return;
        }

        const timer = setTimeout(()=> {
            if(localSearch !== params.search){
                setParams({
                    ...params,
                    search : localSearch,
                    page : pagination.DEFAULT_PAGE
                })
            }
        }, debounceMS);

        return () => clearTimeout(timer)
    }, [localSearch, params , setParams, debounceMS])

    useEffect(() => {
        setLocalSearch(params.search);
    }, [params.search])

    return {
        searchValue : localSearch,
        onSearchChange : setLocalSearch
    }
}