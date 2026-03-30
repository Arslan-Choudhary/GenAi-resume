import express from "express";
import { authUser, upload } from "#middlewares";
import { InterviewController } from "#controllers";

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */
interviewRouter
  .route("/")
  .post(
    authUser,
    upload.single("resume"),
    InterviewController.generateInterviewReport,
  );

export default interviewRouter;
