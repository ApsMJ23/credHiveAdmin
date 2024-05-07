export const convertCamelCaseToSentenceCase = (str: string) => {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
}
export const validateEmails = (emails: { empId: number; id: number; email: string; type: string; }[]) => {
    const emailTestRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emails.every(email => emailTestRegex.test(email.email));
}