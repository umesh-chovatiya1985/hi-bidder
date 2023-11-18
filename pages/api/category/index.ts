import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
import { connect } from "../../../utils/connection"
import { CategorySchema } from "../../../utils/schemas/categorySchema"
import { ResponseFuncs } from "../../../utils/types"
import verifyCSRF from '../../../lib/csrf-token';
import authMiddleware from "../middleware/authMiddleware"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: process.env.APPS_URL
  });
  const limit = req.query?.per_page;
  let skipRec = 0;
  if (limit && req.query?.page) {
    const page = req.query?.page ?? 1;
    const pageNo = parseInt(page.toString()) - 1;
    skipRec = parseInt(pageNo.toString()) * parseInt(limit.toString());
  }
  const parent = req.query?.parent;

  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs
  //function for catch errors
  const catcher = (error: Error) => { res.status(400).json({ error }) };
  await connect();
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Category } = await CategorySchema(); // connect to database
      let mongoQueryTotal = await Category.find({}).populate("parent_id", ('title slug -_id')).populate("child_ids", ('title slug -_id'));
      const totalRecord = mongoQueryTotal ? mongoQueryTotal.length : 0;
      let mongoQuery = Category.find({}).populate("parent_id", ('title slug -_id')).populate("child_ids", ('title slug -_id'));
      if (limit) {
        mongoQuery = Category.find({}).populate("parent_id", ('title slug -_id')).populate("child_ids", ('title slug -_id')).skip(skipRec).limit(parseInt(limit.toString()));
      }
      if (parent) {
        if (parent == "0") {
          mongoQuery = Category.find({ "parent_id": null }).populate("parent_id", ('title slug -_id')).populate("child_ids", ('title slug -_id'));
        }
        else {
          mongoQuery = Category.find({ "parent_id": parent }).populate("parent_id", ('title slug -_id')).populate("child_ids", ('title slug -_id'));
        }
      }
      await mongoQuery.then((resp: any) => {
        res.status(200).json({ status: 1, categories: resp, totalRecord: totalRecord });
      })
        .catch((err: any) => {
          catcher(err);
        });
    },
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Category } = await CategorySchema(); // connect to database
      try {
        const category = new Category(req.body);
        await category.save();
        if (req.body.parent_id) {
          const parentCategory = await Category.findById(req.body.parent_id);
          const categoryId: any = category._id;
          parentCategory.child_ids.push(categoryId);
          await parentCategory.save();
        }
        const response = { status: '1', record: category, message: "Category saved successfully" };
        res.status(201).json(response);
      } catch (error) {
        catcher(error);
      }
      // let category = new Category(req.body);
      // await category.save().then(async (resp: any) => {
      //   if(req.body.parent_id){
      //       const parentCategory = await Category.findById(req.body.parent_id);
      //       parentCategory.parent_id.push();
      //   }
      //   res.status(201).json(resp);
      // })
      // .catch((err: any) => {
      //   catcher(err);
      // });
    },
  }
  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
}

// export default authMiddleware(handler);
export default handler;