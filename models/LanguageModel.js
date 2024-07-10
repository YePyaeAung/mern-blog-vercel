import mongoose from "mongoose";

const LanguageSchema = new mongoose.Schema([
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
    },
]);

export default mongoose.model("languages", LanguageSchema);
