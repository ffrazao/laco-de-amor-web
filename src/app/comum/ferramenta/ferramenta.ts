export function gerarFormulario<T>(entidade: T) {
    let result = {};
    let campos = Object.getOwnPropertyNames(entidade);

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
