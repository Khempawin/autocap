export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export async function makeRequest(url: string, data: any, method: RequestMethod, headers: any) {
    const requestOptions = {
        method: method,
        headers: headers,
        body: data
    };
    const response = await fetch(url, requestOptions);
    const res_data = await response.json();
    return res_data;
}


export async function makePostRequest(url: string, jsonData: any) {
    const dataString = JSON.stringify(jsonData);
    const headers = {
        "Content-Type": "application/json"
    };
    const resData = await makeRequest(url, dataString, RequestMethod.POST, headers);

    return resData;
}