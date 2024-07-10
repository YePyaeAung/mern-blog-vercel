import mongoose from "mongoose";

const ArticleCommentSchema = new mongoose.Schema(
    {
        article: {
            type: mongoose.Schema.ObjectId,
            ref: "articles",
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "users",
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("article_comments", ArticleCommentSchema);
