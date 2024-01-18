const { Validator } = require("jsonschema");
const ExpressError = require("./expressError");
const v = new Validator();

function validate(schema) {
	return (req, res, next) => {
		try {
			const validationResult = v.validate(req.body, schema);
			if (validationResult.errors.length === 0) {
				next();
			} else {
				throw new ExpressError(validationResult.errors[0].stack, 400)
			}
		} catch(error) {
		next(error)
		}
	
	};
}

module.exports = validate;
