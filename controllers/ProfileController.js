import validator from "indicative/validator.js";
import UserModel from "../models/UserModel.js";
import { errorJson, successJson } from "../utils/JsonResponse.js";
import bcrypt from "bcrypt";

const ProfileController = {
    changePassword: async (req, res) => {
        const validatePasswordInput = async payload => {
            const rules = {
                oldPassword: "required | min:3 | max:20",
                newPassword: "required | min:3 | max:20",
            };
            const messages = {
                "oldPassword.required": "Enter a valid old password.",
                "oldPassword.min":
                    "The old password must be at least 3 characters long.",
                "newPassword.required": "Enter a valid new password.",
                "newPassword.min":
                    "The new password must be at least 3 characters long.",
            };
            await validator.validateAll(payload, rules, messages);
        };
        try {
            const { oldPassword, newPassword } = req.body;
            // validation
            await validatePasswordInput(req.body);
            // get login auth user
            const authUser = req.authUser;
            // check user
            const findUser = await UserModel.findById(authUser._id);
            // check password
            const checkOldPassword = bcrypt.compareSync(
                oldPassword,
                findUser.password
            );
            if (!checkOldPassword) {
                return res.json(errorJson("Wrong Password!", null));
            }
            // Save New Password
            const saltRound = bcrypt.genSaltSync(10);
            const hashedNewPassword = bcrypt.hashSync(newPassword, saltRound);
            await UserModel.findByIdAndUpdate(authUser._id, {
                password: hashedNewPassword,
            });
            return res.json(
                successJson("Password Changed Successfully!", findUser)
            );
        } catch (error) {
            return res.json(errorJson("Validation Failed!", error));
        }
    },
    removeAccount: async (req, res) => {
        const validateInputs = async payload => {
            const rules = {
                password: "required | min:3 | max:20",
            };
            const messages = {
                "password.required": "Enter a valid password.",
                "password.min":
                    "The password must be at least 3 characters long.",
            };
            await validator.validateAll(payload, rules, messages);
        };
        try {
            // validation
            await validateInputs(req.body);
            // check user email
            const { password } = req.body;
            // Get authenticated user
            const authUser = req.authUser;
            // Find the user in the database
            const user = await UserModel.findById(authUser._id);
            if (!user) {
                return res.json(errorJson("User not found!", null));
            }
            // check password
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return res.json(errorJson("Wrong Password!", null));
            } else {
                if (user._id == authUser._id) {
                    await UserModel.findByIdAndDelete(authUser._id);
                    res.clearCookie("access_token");
                    return res.json(
                        successJson("Account Deleted Successfully!", null)
                    );
                } else {
                    return res.json(
                        errorJson("This is NOT Your Account!", null)
                    );
                }
            }
        } catch (error) {
            return res.json(errorJson("Validation Failed!", error));
        }
    },
};

export default ProfileController;
