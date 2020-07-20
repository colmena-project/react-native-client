import validation from './Validator'

export default function validate(fieldName, value) {

  let constraints = {
    email: {
      presence: true,
      format: {
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: '^Email no válido.',
      }
    },
    firstName: {
      presence: true,
      format: {
        pattern: /[a-zA-Z\s\.\//\á\é\í\ó\ú\ü\ç]+/,
        flags: "i",
        message: "^Ingrese un nombre válido."
      },
    },
    lastName: {
      presence: true,
      format: {
        pattern: /[a-zA-Z\s\.\//\á\é\í\ó\ú\ü\ç]+/,
        flags: "i",
        message: "^Ingrese un apellido válido."
      },
    },
    nationality: {
      presence: true,
      format: {
        pattern: /[a-zA-Z\s\.\//\á\é\í\ó\ú]+/,
        flags: "i",
        message: "^Ingrese una nacionalidad válida."
      },
    },
    dni: {
      presence: true,
      format: {
        pattern: /[0-9]{8}$/,
        flags: "i",
        message: "^Ingrese un DNI válido."
      },
    },
    cuil: {
      presence: true,
      format: {
        pattern: /[0-9]{2}[-.][0-9]{8}[-.][0-9]{1}$/,
        flags: "i",
        message: "^Ingrese un CUIL/CUIT válido."
      },
    },
    street: {
      presence: { allowEmpty: true },
      format: {
        pattern: /[a-zA-Z\s\.\//\á\é\í\ó\ú]*/,
        flags: "i",
        message: "^Ingrese un calle válida."
      },
    },
    streetNumber: {
      presence: { allowEmpty: true },
      format: {
        pattern: /[0-9]*$/,
        flags: "i",
        message: "^Ingrese un número válido."
      },
    },
    city: {
      presence: true,
      format: {
        pattern: /[a-zA-Z\s\.\//\á\é\í\ó\ú]+/,
        flags: "i",
        message: "^Ingrese una ciudad válida."
      },
    },
    startDate: {
      presence: true,
      format: {
        pattern: /^([1-9]|0[1-9]|[12][0-9]|3[01])[/.]([1-9]|0[1-9]|1[012])[/.](19|20)\d\d$/,
        flags: "i",
        message: "^Ingrese una fecha válida."
      },
    },
    login: {
      presence: {
        allowEmpty: false,
        message: '^Ingrese un DNI o email válido.',
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: '^Ingrese su contraseña.',
      },
      // length: {
      //   minimum: 4,
      //   message: '^Contraseña no válida.',
      // },
      format: {
        pattern: /[a-zA-Z0-9]+/,
        flags: "i",
        message: "^La contraseña debe ser mayor a 8 dígitos."
      },
    },
    oldPassword: {
      presence: {
        allowEmpty: false,
        message: '^Ingrese su contraseña actual.',
      },
    },
    brand: {
      presence: true,
      format: {
        pattern: /[a-zA-Z\s\.\//\á\é\í\ó\ú\ü\ç]+/,
        flags: "i",
        message: "^Ingrese una marca válida."
      },
    },
    model: {
      presence: true,
      format: {
        pattern: /[a-zA-Z0-9\s\.\//\á\é\í\ó\ú\ü\ç]+/,
        flags: "i",
        message: "^Ingrese un modelo válido."
      },
    },
    color: {
      presence: true,
      format: {
        pattern: /[a-zA-Z]+/,
        flags: "i",
        message: "^Ingrese un color válido."
      },
    },
    licensePlate: {
      presence: {
        allowEmpty: false,
        message: '^Ingrese un dominio válido.',
      },
    },
    motorNumber: {
      presence: {
        allowEmpty: false,
        message: '^Ingrese un número de motor válido.',
      },
    },
    chassisNumber: {
      presence: {
        allowEmpty: false,
        message: '^Ingrese un número de chasis válido.',
      },
    },
  };

  var formValues = {}
  formValues[fieldName] = value

  var formFields = {}
  formFields[fieldName] = constraints[fieldName]


  const result = validation(formValues, formFields)

  if (result) {
    return result[fieldName][0]
  }
  return null
}