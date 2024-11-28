
const successResponse = (res,data,message, statusCode = 200) =>{
 return res.status(statusCode).json({
    message: message || "Request Complete Successfully",
    success: true,
    data: data || null,
 });
};

export default successResponse;