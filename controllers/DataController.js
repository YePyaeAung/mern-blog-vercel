import LanguageModel from "../models/LanguageModel.js";
import TagModel from "../models/TagModel.js";
import ArticleModel from "../models/ArticleModel.js";
import ArticleCommentModel from "../models/ArticleCommentModel.js";
import { errorJson, successJson } from "../utils/JsonResponse.js";

const DataController = {
    getTagsLangs: async (req, res) => {
        try {
            const tags = await TagModel.find();
            const langs = await LanguageModel.find();
            return res.json(
                successJson("Get Tags and Languages Successfully!", {
                    tags,
                    langs,
                })
            );
        } catch (error) {
            return res.json(errorJson("Something went wrong!", null));
        }
    },
    getLatestArticles: async (req, res) => {
        try {
            const latest_articles = await ArticleModel.find()
                .limit(4)
                .sort({ _id: -1 });
            const mostCommentArticle = await ArticleModel.findOne()
                .populate("user", "name")
                .sort({
                    comment_count: -1,
                });
            return res.json(
                successJson("Get Latest Articles Successfully!", {
                    latest_articles,
                    mostCommentArticle,
                })
            );
        } catch (error) {
            return res.json(
                errorJson("Error while getting latest articles!", null)
            );
        }
    },
    getMostTrendingArticles: async (req, res) => {
        try {
            const most_view_articles = await ArticleModel.find()
                .limit(4)
                .sort({ view_count: -1 });
            return res.json(
                successJson(
                    "Get Most View Articles Successfully!",
                    most_view_articles
                )
            );
        } catch (error) {
            return res.json("Error while getting most view articles!", null);
        }
    },
    getMostLoveArticles: async (req, res) => {
        try {
            const most_love_articles = await ArticleModel.find()
                .limit(4)
                .sort({ like_count: -1 });
            return res.json(
                successJson(
                    "Get Most Love Articles Successfully!",
                    most_love_articles
                )
            );
        } catch (error) {
            return res.json(
                errorJson("Error while getting most love articles!", null)
            );
        }
    },
    getAllArticles: async (req, res) => {
        try {
            const { title, tag, language } = req.query;
            const { page } = req.query;
            const limit = 2;
            const skip = (page - 1) * limit;
            const articleCount = await ArticleModel.countDocuments();
            const totalPage = Math.ceil(articleCount / limit);
            const queryBuilder = [];
            if (title) {
                queryBuilder.push({ $text: { $search: title } });
            }
            if (tag) {
                queryBuilder.push({ "tags.slug": tag });
            }
            if (language) {
                queryBuilder.push({ "languages.slug": language });
            }

            const query = queryBuilder.length ? { $and: queryBuilder } : {};

            const articles = await ArticleModel.find(query)
                .limit(limit)
                .skip(skip)
                .sort({ _id: -1 });
            return res.json(
                successJson("Get Articles Successfully!", {
                    articles,
                    totalPage,
                })
            );
        } catch (error) {
            return res.json(
                errorJson("Error while getting articles!", error.message)
            );
        }
    },
    getArticleDetails: async (req, res) => {
        try {
            const { id } = req.params;
            await ArticleModel.findByIdAndUpdate(id, {
                $inc: { view_count: 1 },
            });
            const article = await ArticleModel.findById(id).populate(
                "user",
                "name"
            );
            if (!article) {
                return res.json(errorJson("Article Not Found!", null));
            }
            const comments = await ArticleCommentModel.find({ article: id })
                .populate("user", "-password -email")
                .sort({ _id: -1 });
            res.json(
                successJson("Get Single Article Successfully!", {
                    article,
                    comments,
                })
            );
        } catch (error) {
            res.json(errorJson("Something went wrong!", null));
        }
    },
};

export default DataController;
