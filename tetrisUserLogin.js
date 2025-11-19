const uiUsername = document.querySelector("#ui-username");

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

    if (json.success) {
        alert(json.message);
        selectActiveTab(loginMenuDisplay);
    }
    else
        alert(json.error);
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

    if (json.success) {
        await authenticateUserLogin();
        window.location.href = "index.html";
    }
    else
        alert(json.error);

};

async function authenticateUserLogin() {
    let res = await fetch("httpAuth.php");
    let auth = await res.json();

    if (auth.loggedIn) {
        uiUsername.innerHTML = "Username: " + auth.username;
    }
    else {
        uiUsername.innerHTML = "Username: Guest";
    }
}
