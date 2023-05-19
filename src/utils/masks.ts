export const formatCardNumber = (cardNumber: string) => {
  var cleanNumber = cardNumber.replace(/\D/g, "");
  var formattedNumber = "";
  for (var i = 0; i < cleanNumber.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedNumber += " ";
    }
    formattedNumber += cleanNumber.charAt(i);
  }
  return formattedNumber;
};

export const formatExpirationDate = (expirationDate: string) => {
  var cleanNumber = expirationDate.replace(/\D/g, "");
  var formattedNumber = "";
  for (var i = 0; i < cleanNumber.length; i++) {
    if (i === 2) {
      formattedNumber += "/";
    }
    formattedNumber += cleanNumber.charAt(i);
  }
  return formattedNumber;
};

export const formatCPF = (expirationDate: string) => {
  var cleanNumber = expirationDate.replace(/\D/g, "");
  var formattedNumber = "";
  for (var i = 0; i < cleanNumber.length; i++) {
    if (i === 3 || i === 6) {
      formattedNumber += ".";
    } else if (i === 9) {
      formattedNumber += "-";
    }
    formattedNumber += cleanNumber.charAt(i);
  }
  return formattedNumber;
};
