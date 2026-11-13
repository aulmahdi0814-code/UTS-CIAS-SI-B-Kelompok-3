
/* ==================================================
   CAIS - LOGIN SYSTEM
   ================================================== */

// DATA AKUN DEMO

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


// MENAMPILKAN PESAN LOGIN

function loginTampilkanPesan(teks, tipe) {

    const box = document.getElementById("login-alert");

    box.textContent = teks;

    box.className = "login-alert show " + tipe;

}


// PROSES LOGIN

function loginProses(event) {

    event.preventDefault();

    const username = document
        .getElementById("username")
        .value.trim();

    const password = document
        .getElementById("password")
        .value;


    // VALIDASI INPUT

    if (!username || !password) {

        loginTampilkanPesan(
            "Username dan password wajib diisi.",
            "error"
        );

        return;
    }


    // MEMERIKSA AKUN

    const akun = AKUN_DEMO.find(function (data) {

        return data.username === username &&
               data.password === password;

    });


    // JIKA AKUN TIDAK DITEMUKAN

    if (!akun) {

        loginTampilkanPesan(
            "Username atau password salah.",
            "error"
        );

        return;
    }


    // MENYIMPAN DATA PENGGUNA

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
            "Penyimpanan data pengguna gagal.",
            "error"
        );

        return;
    }


    // LOGIN BERHASIL

    loginTampilkanPesan(
        "Login berhasil! Mengalihkan ke dashboard...",
        "ok"
    );


    // MENGARAHKAN KE DASHBOARD

    setTimeout(function () {

        window.location.href = "dashboard.html";

    }, 1000);

}


// FITUR TAMPILKAN PASSWORD

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("form-login");

    if (!form) return;


    // EVENT FORM LOGIN

    form.addEventListener("submit", loginProses);


    // EVENT TAMPILKAN PASSWORD

    const showPassword = document.getElementById("show-password");

    const passwordInput = document.getElementById("password");

    showPassword.addEventListener("change", function () {

        passwordInput.type = this.checked
            ? "text"
            : "password";

    });

});
