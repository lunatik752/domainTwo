const receiveMessage = (e) => {
    const data = e.data;
    switch (data.method) {
        case "write" :
            localStorage.setItem(data.key, data.value);
            e.source.postMessage({"value": "Written"}, "*")
            break;
        case "remove":
            if (localStorage.getItem(data.key) !== null) {
                localStorage.removeItem(data.key)
                e.source.postMessage({"value": "Removed"}, "*")
            } else {
                e.source.postMessage({"value": "Key not found"}, "*")
            }
            break;
        case "read":
            if (localStorage.getItem(data.key) !== null) {
                e.source.postMessage(
                    {
                        "value": `value: ${localStorage.getItem(data.key)}`
                    }, "*")
            } else {
                e.source.postMessage({"value": "Key not found"}, "*")
            }
            break;
        case "func":
            e.source.postMessage( {
                "callback": true,
                "value": func.toString()
            }, "*")
            break;
    }
}

window.addEventListener("message", receiveMessage);

// функция для задания 5 передаваемая в domain.one для вызова
const func = () => {
    localStorage.clear()
    console.log("Local Storage cleared!")
}
