export const buildGetRequest = url => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.send();

    return new Promise(function(resolve, reject) {
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const jsonResponse = JSON.parse(xhr.responseText);
                    resolve(jsonResponse);
                } else {
                    reject();
                }
            }
        };
    });
};
