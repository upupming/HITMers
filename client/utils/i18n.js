let T = {}
T.locale = null
T.locales = {}

T.registerLocale = function (locales) {
    T.locales = locales;
}

T.setLocale = function (code) {
    T.locale = code
}

T.getLanguage = function() {
    return T.locales[T.locale];
}

export default T