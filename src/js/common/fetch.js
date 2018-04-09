
const fetchPost=(url,params)=>{
    return fetch(url,{
        method:'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials:'include',  //带cookie
        params:params
    }).then((res)=>{
        if(!res.ok){
            throw Error(res.statusText);
        }
        return res.json();
    })
}
const fetchJson=(url,params)=>{
    return fetch(url,{
        method:'GET',
        headers: {

        },
        credentials:'include',  //带cookie
        params:params
    }).then((res)=>{
        if(!res.ok){
            throw Error(res.statusText);
        }
        return res.json();
    })
}
export{fetchPost,fetchJson}