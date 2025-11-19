document.querySelector("#register-button").onclick = async () => {
    const data = new FormData();
    data.append("username", document.querySelector("#register-username").value);
    data.append("password", document.querySelector("#register-password").value);
    data.append("repeat-password", document.querySelector("#register-repeat-password").value);

    let res = await fetch("register.php", {
        method: "POST",
        body: data
    });

    let text = await res.text();
    alert(text);
};

document.querySelector("#login-button").onclick = async () => {
    const data = new FormData();
    data.append("username", document.querySelector("#login-username").value);
    data.append("password", document.querySelector("#login-password").value);

    let res = await fetch("login.php", {
        method: "POST",
        body: data
    });

    let text = await res.text();

    if (text === "SUCCESS") {
        window.location.href = "index.html";
    } else {
        alert(text);
    }
};
