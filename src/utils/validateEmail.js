// https://stackoverflow.com/a/9204568/4674834
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export default validateEmail;