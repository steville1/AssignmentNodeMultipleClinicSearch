const url = require("url");

/**const routePaths = {
    clinics:"clinics",
    "validateClinics": "/clinics/validate"};

const getPathName = (reqUrl) => {
  const parsedReqUrl = url.parse(reqUrl, true);
  return parsedReqUrl.pathname.trim();
};
**/
const response = (res,data,statusCode) => {
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
};


module.exports = {
    response,
};
