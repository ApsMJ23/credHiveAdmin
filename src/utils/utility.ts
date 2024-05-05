export const convertCamelCaseToSentenceCase = (str: string) => {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
}