function validateSpec(spec, data, optionalConfig = {}) {
  const { error, value } = spec.validate(data, {
    allowUnknown: true,
    stripUnknown: true,
    errors: {
      wrap: {
        label: '',
      },
    },
    ...optionalConfig,
  });
  if (error) {
    throw new Error(error.message);
  }
  return value;
};

 async function validateAsyncSpec(spec, data, optionalConfig = {}) {
  try {
    const value = await spec.validateAsync(data, {
      allowUnknown: true,
      stripUnknown: true,
      errors: {
        wrap: {
          label: '',
        },
      },
      ...optionalConfig,
    });
    return value;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  validateSpec,
  validateAsyncSpec
}
