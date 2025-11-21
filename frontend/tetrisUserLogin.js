const isLoggedIn = localStorage.getItem("isLoggedIn");

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

        uiUsername.innerHTML = json.username;

        uiLoginButton.style.display = "none";
        uiLogoutButton.style.display = "flex";

        selectActiveTab(mainMenuDisplay);
    }
    else
        alert(json.error);
};

document.querySelector("#ui-logout-button").onclick = async () => {
    await fetch("../backend/auth/logout.php");

    await updateUI();

    alert("Logged out successfully.");
}

async function getSession() {
    let response = await fetch("../backend/auth/session.php");
    return await response.json();
}
