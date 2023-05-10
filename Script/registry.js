
window.addEventListener("load", function () {
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('registerForm').addEventListener('submit', validarFormulario);
    });

    function validarFormulario(evento) {
        evento.preventDefault();
        var password = document.getElementById('passwordInput').value,
            reviewPassword = document.getElementById('reviewPassword').value;

        if (password.length < 8) {
            alert("Hacer la contraseña mas larga");
            document.registerForm.passwordInput.focus();
            return 0;
        }

        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
            strength += 1;
        } else {
            alert("Usar minusculas y mayusculas");
            document.registerForm.passwordInput.focus();
            return 0;
        }

        if (password.match(/\d/)) {
            strength += 1;
        } else {
            alert("Incluya un numero");
            document.registerForm.passwordInput.focus();
            return 0;
        }

        if (password.match(/[^a-zA-Z\d]/)) {
            strength += 1;
        } else {
            alert("Incluya un caracter especial ");
            document.registerForm.passwordInput.focus();
            return 0;
        }

        //Campo verificar contraseñas
        if (reviewPassword.length == 0) {
            alert("El campo repite tu contraseña esta vacio");
            document.registerForm.reviewPassword.focus();
            return 0;
        }

        if (reviewPassword != password) {
            alert("Las contraseñas no son iguales");
        }
    }
});

function verificarCheck() {
    //Campo terminos
    const selectTerms = document.getElementById('selectTermsConditions'),
        btnSend = document.getElementById('btnSend');

    selectTerms.addEventListener('change', function () {
        if (this.checked) {
            btnSend.disabled = false;
            btnSend.style.opacity = 1;
        } else {
            btnSend.disabled = true;
            btnSend.style.opacity = 0.5;
        }
    });
}