// login api
export const login = credential => {
    // credential: {username: value, password: value}
    // request option: method, url, data
    const {username, password} = credential;
    const loginUrl = `/login?username=${username}&password=${password}`;
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then((response) => {
        // case1: login successfully
        // case2: login failed
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to log in");
        }
    });
}