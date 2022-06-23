const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "production", "test")
      .default("development")
      .required(),
    APP_PORT: Joi.number().default(5000),
    DB_URI: Joi.string().required().description("MongoDB connection string"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    // JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
    //   .default(30)
    //   .description("JWT access token expiration time in minutes"),
    JWT_ACCESS_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("JWT access token expiration time in minutes"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("JWT refresh token expiration time in days"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("JWT reset password token expiration time in minutes"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("JWT verify email token expiration time in minutes"),
    SMTP_HOST: Joi.string().description("Server that will send the email"),
    SMTP_PORT: Joi.number().description("Port to connect to the email server"),
    SMTP_USERNAME: Joi.string().description("Username for email server"),
    SMTP_PASSWORD: Joi.string().description("Password for email server"),
    EMAIL_FROM: Joi.string().description(
      "The from field in the emails sent by the app"
    ),
    FRONTEND_URL: Joi.string().description("Frontend base url"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.APP_PORT,
  mongoose: {
    url: envVars.DB_URI + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationDays: envVars.JWT_ACCESS_EXPIRATION_DAYS,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  FRONTEND_URL: envVars.FRONTEND_URL,
};
