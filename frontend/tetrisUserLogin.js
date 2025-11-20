const uiUsername = document.querySelector("#ui-username");

document.querySelector("#register-button").onclick = async () => {
    event.preventDefault();

    const data = new FormData();
    data.append("username", document.querySelector("#register-username").value);
    data.append("password", document.querySelector("#register-password").value);
    data.append("repeat-password", document.querySelector("#register-repeat-password").value);

    let res = await fetch("../backend/auth/register.php", {
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

    let res = await fetch("../backend/auth/login.php", {
        method: "POST",
        body: data
    });

    let json = await res.json();

    if (json.success) {
        alert(json.message);
        window.location.href = "../index.php";
        uiLoginButton.style.display = "none";
        uiLogoutButton.style.display = "flex";
    }
    else
        alert(json.error);

};

document.querySelector("#ui-logout-button").onclick = () => {
    fetch("../backend/auth/logout.php").then(
        response => response.json()).then(
            json => {
                if (json.success) {
                    uiUsername.innerHTML = "Username: Guest";

                    uiLoginButton.style.display = "flex";
                    uiLogoutButton.style.display = "none";
                }
            }
    )
}
