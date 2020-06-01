import { AbstractControl, Validators } from '@angular/forms';

export function gerarFormulario<T>(entidade: T) {
    const result = {};
    const campos = Object.getOwnPropertyNames(entidade);

    console.log(Object.getPrototypeOf(entidade));

    for (let i = 0; i < campos.length; i++) {
        result[campos[i]] = [entidade[campos[i]], []];
        console.log(entidade, result);
    }
    return result;
}

export function findIndexById(lista: any[], id: number): number {
    let result: number = null;
    if (!lista || !id) {
        return result;
    }
    for (let i = 0; i < lista.length; i++) {
        if (lista[i]['id'] && lista[i]['id'] == id) {
            result = i;
            break
        }
    }
    return result;
}

export function deepCopy(obj) {
    let copy;

    if (null == obj || "object" != typeof obj) return obj;

    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
        }
        return copy;
    }

    throw new Error("Impossível copiar objeto! Tipo não suportado.");
}

export function isNumber(value: string | number): boolean {
    return ((value != null) &&
        (value !== '') &&
        !isNaN(Number(value.toString())));
}

export function hojeStr() {
    const data = new Date();
    return `${('0' + data.getDate()).substr(-2)}/${('0' + (data.getMonth() + 1)).substr(-2)}/${data.getFullYear()}`;
}

export function deEnumParaChaveValor(e: any): any {
    return Object.keys(e).map(key => {
        return {
            chave: key,
            valor: e[key]
        };
    });
}

export const IMAGE_MIME_DEFAULT = 'data:image/jpeg;base64,';

export function adMime(v: string) {
    if (v && !v.startsWith(IMAGE_MIME_DEFAULT.substr(0, 5))) {
        v = IMAGE_MIME_DEFAULT + v;
    }
    return v;
}

export function removeMime(v: string) {
    if (v && v.startsWith(IMAGE_MIME_DEFAULT.substr(0, 5))) {
        v = v.substr(v.indexOf(',') + 1, v.length);
    }
    return v;
}

export function formataCpfCnpj(valor: string) {
    if (!valor) {
        return valor;
    }
    valor = valor.replace(/\D/g, '');
    if (!valor) {
        return valor;
    }
    return (valor.length <= 11) ? formataCpf(valor) : formataCnpj(valor);
}
export function formataCpf(valor: string) {
    if (!valor) {
        return valor;
    }
    valor = valor.replace(/\D/g, '');
    if (!valor) {
        return valor;
    }
    valor = '00000000000'.concat(valor).slice(-11);
    valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (regex, a1, a2, a3, a4) => `${a1}.${a2}.${a3}-${a4}`);
    return valor;
}

export function formataCnpj(valor: string) {
    if (!valor) {
        return valor;
    }
    valor = valor.replace(/\D/g, '');
    if (!valor) {
        return valor;
    }
    valor = '00000000000000'.concat(valor).slice(-14);
    valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, (regex, a1, a2, a3, a4, a5) => `${a1}.${a2}.${a3}/${a4}-${a5}`);
    return valor;
}

export function isCpfValido() {
    return (control: AbstractControl): Validators => {
        const cpf = control.value;
        if (cpf) {
            return validarCPF(cpf) ? null : { cpfNotValid: true };
        }
        return null;
    };
}

export function isCnpjValido() {
    return (control: AbstractControl): Validators => {
        const cnpj = control.value;
        if (cnpj) {
            return validarCNPJ(cnpj) ? null : { cnpjNotValid: true };
        }
        return null;
    };
}

export function isCpfCnpjValido() {
    return (control: AbstractControl): Validators => {
        const cpfCnpj = control.value;
        if (cpfCnpj) {
            return validarCPF(cpfCnpj) || validarCNPJ(cpfCnpj) ? null : { cpfCnpjNotValid: true };
        }
        return null;
    };
}

export function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') {
        return false;
    }
    if ((cpf.length !== 11) ||
        (cpf === '00000000000') ||
        (cpf === '11111111111') ||
        (cpf === '22222222222') ||
        (cpf === '33333333333') ||
        (cpf === '44444444444') ||
        (cpf === '55555555555') ||
        (cpf === '66666666666') ||
        (cpf === '77777777777') ||
        (cpf === '88888888888') ||
        (cpf === '99999999999')) {
        return false;
    }
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) {
        add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(9))) {
        return false;
    }
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) {
        add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
        rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
}

export function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj === '') {
        return false;
    }
    if ((cnpj.length !== 14) ||
        (cnpj === '00000000000000') ||
        (cnpj === '11111111111111') ||
        (cnpj === '22222222222222') ||
        (cnpj === '33333333333333') ||
        (cnpj === '44444444444444') ||
        (cnpj === '55555555555555') ||
        (cnpj === '66666666666666') ||
        (cnpj === '77777777777777') ||
        (cnpj === '88888888888888') ||
        (cnpj === '99999999999999')) {
        return false;
    }
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== digitos.charAt(0)) {
        return false;
    }
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== digitos.charAt(1)) {
        return false;
    }
    return true;
}

export function formataTelefone(valor: string) {
    if (!valor) {
        return valor;
    }
    valor = valor.replace(/\D/g, '');
    if (!valor) {
        return valor;
    }
    if (valor.length === 8) {
        return valor.replace(/(\d{4})(\d{4})/, (regex, a1, a2) => `${a1}-${a2}`);
    } else if (valor.length === 9) {
        return valor.replace(/(\d{5})(\d{4})/, (regex, a1, a2) => `${a1}-${a2}`);
    } else if (valor.length === 10) {
        return valor.replace(/(\d{2})(\d{4})(\d{4})/, (regex, a1, a2, a3) => `(${a1}) ${a2}-${a3}`);
    } else if (valor.length === 11) {
        return valor.replace(/(\d{2})(\d{5})(\d{4})/, (regex, a1, a2, a3) => `(${a1}) ${a2}-${a3}`);
    } else {
        return valor;
    }
}

export function formataCep(valor: string) {
    if (!valor) {
        return valor;
    }
    valor = valor.replace(/\D/g, '');
    if (!valor) {
        return valor;
    }
    if (valor.length === 8) {
        return valor.replace(/(\d{5})(\d{3})/, (regex, a1, a2) => `${a1}-${a2}`);
    } else {
        return valor;
    }
}
