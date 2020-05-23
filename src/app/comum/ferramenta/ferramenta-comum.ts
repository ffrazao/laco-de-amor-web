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
