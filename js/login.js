
const AKUN_DEMO = [
    {
        username: "admin",
        password: "admin123",
        nama: "Administrator",
        role: "Admin"
    },
    {
        username: "dosen",
        password: "dosen123",
        nama: "Hartanto SN",
        role: "Dosen"
    },
    {
        username: "mahasiswa",
        password: "mhs123",
        nama: "Mahasiswa Demo",
        role: "Mahasiswa"
    }
];

function loginTampilkanPesan(teks, tipe) {
    const box = document.getElementById("login-alert");
    box.textContent = teks;
    box.className = "login-alert show " + tipe;
}

function loginProses(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
        loginTampilkanPesan(
            "Username dan password wajib diisi.",
            "error"
        );
        return;
    }

    const akun = AKUN_DEMO.find(
        a => a.username === username &&
             a.password === password
    );

    if (!akun) {
        loginTampilkanPesan(
            "Username atau password salah.",
            "error"
        );
        return;
    }

    try {
        localStorage.setItem(
            "cais_user",
            JSON.stringify({
                username: akun.username,
                nama: akun.nama,
                role: akun.role
            })
        );
    } catch (error) {
        loginTampilkanPesan(
            "Penyimpanan browser tidak tersedia.",
            "error"
        );
        return;
    }

    loginTampilkanPesan(
        "Login berhasil! Mengalihkan ke dashboard...",
        "ok"
    );

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 700);
}

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form-login");

    if (!form) return;

    form.addEventListener("submit", loginProses);

    document.getElementById("show-password")
        .addEventListener("change", (event) => {

            document.getElementById("password").type =
                event.target.checked ? "text" : "password";

        });
});
