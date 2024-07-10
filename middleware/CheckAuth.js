import { errorJson } from "../utils/JsonResponse.js";
import jwt from "jsonwebtoken";

const CheckAuth = (req, res, next) => {
    const { access_token } = req.cookies;
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        return res.json(errorJson("Not Auth!", { auth: false }));
    }
    jwt.verify(access_token, secretKey, (err, data) => {
        if (err) {
            return res.json(errorJson("Not Auth!", { auth: false }));
        }
        req.authUser = data;
        next();
    });
};

export default CheckAuth;
