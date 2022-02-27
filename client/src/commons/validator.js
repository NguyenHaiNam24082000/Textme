const validator = (value, requirements, length) => {
  let error = "Must be";
  if (value === undefined || value === null || value === "") {
    return "required";
  }
  if (value.length < length) {
    error += `at least ${length} characters`;
  }
  requirements.forEach((requirement) => {
    if (requirement.re.test(value)) {
      error += `, ${requirement.message}`;
    }
  });
  return error;
};

export default validator;