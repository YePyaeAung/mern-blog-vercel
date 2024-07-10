import mongoose from "mongoose";
import dotenv from "dotenv";
import TagModel from "../models/TagModel.js";
import LanguageModel from "../models/LanguageModel.js";
import UserModel from "../models/UserModel.js";
import slug from "slug";
import bcrypt from "bcrypt";

dotenv.config();

const mongo_url = process.env.MONGO;

const connectDB = () => {
    try {
        mongoose.connect(mongo_url);
        console.log("Database Connected");
    } catch (error) {
        console.log(error.message);
    }
};

const tags = [
    "နည်းလမ်းများ",
    "Tutorial",
    "Tips",
    "Web Development",
    "Design",
    "UI/UX",
];

const languages = [
    "PHP",
    "JavaScript",
    "Java",
    "Python",
    "JQuery",
    "Laravel",
    "MERN Stack",
];

const seedUser = async () => {
    try {
        await UserModel.deleteMany();
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        await UserModel.create({
            name: "Admin",
            email: "admin@gmail.com",
            password: bcrypt.hashSync("password", salt),
        });
    } finally {
        console.log("User Seeding Done!");
    }
};

const seedTags = async () => {
    try {
        await TagModel.deleteMany();
        tags.map(async tag => {
            await TagModel.create({
                name: tag,
                slug: slug(tag),
            });
        });
    } finally {
        console.log("Tags Seeding Done!");
    }
};

const seedLanguages = async () => {
    try {
        await LanguageModel.deleteMany();
        languages.map(async language => {
            await LanguageModel.create({
                name: language,
                slug: slug(language),
            });
        });
    } finally {
        console.log("Languages Seeding Done!");
    }
};

const seed = async () => {
    console.log("Start seeding User...!");
    await seedUser();
    console.log("Start seeding Tags...!");
    await seedTags();
    console.log("Start seeding Languages...!");
    await seedLanguages();
};

connectDB();
seed();
