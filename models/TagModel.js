import mongoose from "mongoose";

const TagSchema = new mongoose.Schema([
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

export default mongoose.model("tags", TagSchema);
