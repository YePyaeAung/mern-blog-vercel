import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    tags: [
        {
            _id: { type: String, required: true },
            slug: { type: String, required: true },
            name: { type: String, required: true },
        },
    ],
    languages: [
        {
            _id: { type: String, required: true },
            slug: { type: String, required: true },
            name: { type: String, required: true },
        },
    ],
    description: {
        type: String,
        required: true,
    },
    like_count: {
        type: Number,
        default: 0,
    },
    comment_count: {
        type: Number,
        default: 0,
    },
    view_count: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true,
    },
});

ArticleSchema.index({ title: "text" });

export default mongoose.model("articles", ArticleSchema);
