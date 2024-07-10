import ArticleCommentModel from "../models/ArticleCommentModel.js";
import ArticleModel from "../models/ArticleModel.js";
import { errorJson, successJson } from "../utils/JsonResponse.js";

const CommentController = {
    storeComment: async (req, res) => {
        try {
            const auth_id = req.authUser._id;
            const { article_id, comment } = req.body;
            const createdComment = await ArticleCommentModel.create({
                article: article_id,
                user: auth_id,
                comment,
            });
            await ArticleModel.findByIdAndUpdate(article_id, {
                $inc: { comment_count: 1 },
            });
            return res.json(
                successJson("Comment Created Successfully!", createdComment)
            );
        } catch (error) {
            return res.json(errorJson("Error While Commenting!", null));
        }
    },
};

export default CommentController;
