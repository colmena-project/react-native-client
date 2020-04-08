import validation from './Validator'

export default function validate(fieldName, value) {

  let constraints = {
    bdate: {
      presence: true,
      format: {
        pattern: /^([1-9]|0[1-9]|[12][0-9]|3[01])[/.]([1-9]|0[1-9]|1[012])[/.](19|20)\d\d$/,
        flags: "i",
        message: "^Ingrese una fecha válida."
      },
    },
    firstName: {
      presence: true,
      format: {
        pattern: /[a-zA-Z\s\.\//\á\é\í\ó\ú]+/,
        flags: "i",
        message: "^Ingrese un nombre válido."
      },
    },    
    lastName: {
      presence: true,
      format: {
        pattern: /[a-zA-Z\s\.\//\á\é\í\ó\ú\ü]+/,
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
    email: {
      presence: true,
      format: {
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: '^Email no válido.',
      }
    },
    cel: {
      presence: true,
      format: {
        pattern: /[0-9]{10}$/,
        flags: "i",
        message: "^Ingrese un número válido."
      },
    },
    street: {
      presence: {allowEmpty: true},
      format: {
        pattern: /[a-zA-Z\s\.\//\á\é\í\ó\ú]*/,
        flags: "i",
        message: "^Ingrese un calle válida."
      },
    },
    streetNumber: {
      presence:  {allowEmpty: true},
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
    neighbourhood: {
      presence: {allowEmpty: true},
      format: {
        pattern: /[a-zA-Z0-9\s\.\//\á\é\í\ó\ú]*/,
        flags: "i",
        message: "^Ingrese un barrio válido."
      },
    },
    mz: {
      presence:  {allowEmpty: true},
      format: {
        pattern: /[0-9]*$/,
        flags: "i",
        message: "^Ingrese un número de manzana válido."
      },
    },
    floor: {
      presence:  {allowEmpty: true},
      format: {
        pattern: /[0-9]*$/,
        flags: "i",
        message: "^Ingrese un número de piso válido."
      },
    },
    houseNumber: {
      presence:  {allowEmpty: true},
      format: {
        pattern: /[a-zA-Z0-9]*$/,
        flags: "i",
        message: "^Ingrese un número de depto válido."
      },
    },
    state: {
      presence: true,
      format: {
        pattern: /[a-zA-Z\s\.\//\á\é\í\ó\ú]+/,
        flags: "i",
        message: "^Ingrese una provincia válida."
      },
    },
    password: {
      presence: true,
      length: {
        minimum: 4,
        message: '^Contraseña no válida.',
      }
    },
    confirmPassword: {
      presence: true,
      equality: 'password'
    },
    age: {
      presence: {
        allowEmpty: false,
        message: '^Ingrese una edad válida.',
      },
      format: {
        pattern: /[0-9]*$/,
        flags: "i",
        message: "^Ingrese una edad."
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
      format: {
        pattern: /[a-zA-Z0-9]{8,}$/,
        flags: "i",
        message: "^La contraseña debe ser mayor a 8 dígitos."
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