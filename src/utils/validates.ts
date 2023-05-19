export const ValidateSuperiorDateLastMonth = (date: string) => {
  var month = parseInt(date.split("/")[0], 10);
  var year = parseInt(date.split("/")[1], 10);

  if (month < 1 || month > 12 || isNaN(month) || isNaN(year)) {
    return false;
  }

  var currentDate = new Date();
  var currentMonth = currentDate.getMonth() + 1;
  var currentYear = parseInt(
    currentDate.getFullYear().toString().slice(-2),
    10
  );

  if (year > currentYear || (year === currentYear && month > currentMonth)) {
    return true;
  }
  return false;
};

export const validateCPF = (cpf: any) => {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  var allDigitsAreSame = /^(.)\1*$/.test(cpf);
  if (allDigitsAreSame) {
    return false;
  }

  var sum = 0;
  var remainder;
  for (var i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (var j = 1; j <= 10; j++) {
    sum += parseInt(cpf.substring(j - 1, j)) * (12 - j);
  }
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
};
