import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";
import { default as slugify } from 'slugify';
import { uploadFile } from "../upload/uploadFile";
import { CategorySchema } from "../../../utils/schemas/categorySchema";
import { ContentPageSchema } from "../../../utils/schemas/contentpageSchema";
import { homesliderSchema } from "../../../utils/schemas/homesliderSchema";
import { bannerSchema } from "../../../utils/schemas/bannerSchema";
import { helptopicSchema } from "../../../utils/schemas/helptopicSchema";
import { helpcategorySchema } from "../../../utils/schemas/helpcategorySchema";
import { helplistSchema } from "../../../utils/schemas/helplistSchema";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/images", "/slider"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images", "/slider"));
  }
  // try {
  const catcher = (error: Error) => res.status(400).json({ error });

  const response = await uploadFile(req, true, "/slider");
  let apiResponse = { status: 0, message: "No action done with api." };
  if (response.fields) {
    if (response.fields.table) {
      switch (response.fields.table) {
        case "helptopic":
          const helpTopicData = JSON.parse(response.fields.data.toString());
          helpTopicData.slug = slugify(helpTopicData.topic_name, { lower: true, trim: true });
          helpTopicData.isActive = helpTopicData.isActive == 'on' ? true : false;
          const { HelpTopic } = await helptopicSchema();
          if (helpTopicData._id && helpTopicData._id != '') {
            const editCategory = await HelpTopic.findById(helpTopicData._id);
            if (editCategory) {
              const topicId = helpTopicData._id;
              delete helpTopicData._id;
              const resp = await HelpTopic.findByIdAndUpdate(topicId, helpTopicData, { new: true }).catch(catcher);
              apiResponse = { status: 1, message: "Help Topic updated successfully." };
              break;
            }
          }
          let helptopic = new HelpTopic(helpTopicData);
          const respHelptopic = await helptopic.save().catch(catcher);
          apiResponse = { status: 1, message: "Help Topic created successfully." };
          break;
        case "help-category":
          const helpCategoryData = JSON.parse(response.fields.data.toString());
          helpCategoryData.slug = slugify(helpCategoryData.help_category, { lower: true, trim: true });
          helpCategoryData.isActive = helpCategoryData.isActive == 'on' ? true : false;
          const { HelpCategory } = await helpcategorySchema();
          if (helpCategoryData._id && helpCategoryData._id != '') {
            const editCategory = await HelpCategory.findById(helpCategoryData._id);
            if (editCategory) {
              const topicId = helpCategoryData._id;
              delete helpCategoryData._id;
              const resp = await HelpCategory.findByIdAndUpdate(topicId, helpCategoryData, { new: true }).catch(catcher);
              apiResponse = { status: 1, message: "Help Category updated successfully." };
              break;
            }
          }
          let helpCategory = new HelpCategory(helpCategoryData);
          const respHelpcategory = await helpCategory.save().catch(catcher);
          apiResponse = { status: 1, message: "Help Category created successfully." };
          break;
        case "help-list":
          const helpListData = JSON.parse(response.fields.data.toString());
          helpListData.slug = slugify(helpListData.title, { lower: true, trim: true });
          helpListData.isActive = helpListData.isActive == 'on' ? true : false;
          const { HelpList } = await helplistSchema();
          if (helpListData._id && helpListData._id != '') {
            const editCategory = await HelpList.findById(helpListData._id);
            if (editCategory) {
              const topicId = helpListData._id;
              delete helpListData._id;
              const resp = await HelpList.findByIdAndUpdate(topicId, helpListData, { new: true }).catch(catcher);
              apiResponse = { status: 1, message: "Help List updated successfully." };
              break;
            }
          }
          let helpList = new HelpList(helpListData);
          const resphelpList = await helpList.save().catch(catcher);
          apiResponse = { status: 1, message: "Help List created successfully." };
          break;
        case "category":
          const categoryData = JSON.parse(response.fields.data.toString());
          categoryData.slug = slugify(categoryData.title, { lower: true, trim: true });
          const { Category } = await CategorySchema();
          if (categoryData._id && categoryData._id != '') {
            const editCategory = await Category.findById(categoryData._id);
            if (editCategory) {
              const categoryId = categoryData._id;
              delete categoryData._id;
              if (categoryData.parent_id) {
                const parentCategory = await Category.findById(req.body.parent_id);
                parentCategory.child_ids.push(categoryId);
                await parentCategory.save();
              }
              const resp = await Category.findByIdAndUpdate(categoryId, categoryData, { new: true }).catch(catcher);
              apiResponse = { status: 1, message: "Category updated successfully." };
              break;
            }
          }
          let category = new Category(categoryData);
          const resp = await category.save().catch(catcher);
          if (categoryData.parent_id) {
            const parentCategory = await Category.findById(categoryData.parent_id);
            const categoryId: any = category._id;
            parentCategory.child_ids.push(categoryId);
            await parentCategory.save();
          }
          apiResponse = { status: 1, message: "Category created successfully." };
          break;
        case "contentpage":
          const contentData = JSON.parse(response.fields.data.toString());
          contentData.slug = slugify(contentData.title, { lower: true, trim: true });
          const { ContentPage } = await ContentPageSchema();
          if (contentData._id && contentData._id != '') {
            const editCategory = await ContentPage.findById(contentData._id);
            if (editCategory) {
              const pageId = contentData._id;
              delete contentData._id;
              const resp = await ContentPage.findByIdAndUpdate(pageId, contentData, { new: true }).catch(catcher);
              apiResponse = { status: 1, message: "Category updated successfully." };
              break;
            }
          }
          let contentpage = new ContentPage(contentData);
          const contentResp = await contentpage.save().catch(catcher);
          apiResponse = { status: 1, message: "Content page created successfully." };
          break;
        case "homeslider":
          const sliderData = JSON.parse(response.fields.data.toString());
          const { HomeSlider } = await homesliderSchema();
          if (sliderData._id && sliderData._id != '') {
            const editSlider = await HomeSlider.findById(sliderData._id);
            if (editSlider) {
              const pageId = sliderData._id;
              delete sliderData._id;
              const resp = await HomeSlider.findByIdAndUpdate(pageId, sliderData, { new: true }).catch(catcher);
              apiResponse = { status: 1, message: "Home Slider updated successfully." };
              break;
            }
          }
          let homesliderPage = new HomeSlider(sliderData);
          const sliderRespo = await homesliderPage.save().catch(catcher);
          apiResponse = { status: 1, message: "Home slider created successfully." };
          break;
        default:
          apiResponse = { status: 0, message: "Opps! No case matched with given table." };
      }
    }
  }
  res.status(200).json(apiResponse);
  // }
  // catch(error) {
  //   res.status(400).json({ error });
  // }
};

export default handler;