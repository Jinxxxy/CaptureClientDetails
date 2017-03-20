export var getUserData = {
    getUserObject: ((userId): Promise<Object>=>{
        var getUserPromise = new Promise<Object>((res, rej)=>{
            var conn = new XMLHttpRequest();
            conn.open("GET", "./app/JSONFiles/UserData/" + userId + ".json", true);
            conn.onload = (()=>{
                var returnObject = JSON.parse(conn.response);
                res(returnObject["data"][0]);
            })
            conn.onerror = (()=>{
                var erroObject = {
                    "errorMessage": "Couldn't load user data"
                }
                rej(erroObject)
            })
            conn.send();
        })
        return getUserPromise;
        
    })
}

export default getUserData;