document.querySelector("#register-button").onclick = async () => {
    event.preventDefault();

    const data = new FormData();
    data.append("username", document.querySelector("#register-username").value);
    data.append("password", document.querySelector("#register-password").value);
    data.append("repeat-password", document.querySelector("#register-repeat-password").value);

    let res = await fetch("register.php", {
        method: "POST",
        body: data
    });

    let json = await res.json();
    let status = res.status;

    if (status === 200) {
        alert(json.message);
        selectActiveTab(loginMenuDisplay);
    }
    else if (status === 400)
        alert(json.error);
    else if (status === 401)
        alert(json.error);
    else
        alert("Unknown error: (" + status + ")");
};

document.querySelector("#login-button").onclick = async () => {
    event.preventDefault();

    const data = new FormData();
    data.append("username", document.querySelector("#login-username").value);
    data.append("password", document.querySelector("#login-password").value);

    let res = await fetch("login.php", {
        method: "POST",
        body: data
    });

    let json = await res.json();
    let status = res.status;

    if (status === 200)
        window.location.href = "index.html";
    else if (status === 400)
        alert(json.error);
    else if (status === 401)
        alert(json.error);
    else
        alert("Unknown error: (" + status + ")");
};
