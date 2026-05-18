import React, { Children, useEffect, useState } from 'react'

export default function Preloader({Children}) {
    const [ready, setReady] = useState(false);
    useEffect(()=>{
        const timer = setTimeout(()=>setReady(true),1000)
    },[])
    if(!ready) return <p>Please Wait..</p>
    return Children;

}


