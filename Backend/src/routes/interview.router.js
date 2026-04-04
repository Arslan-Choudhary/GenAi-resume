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

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter
  .route("/report/:interviewId")
  .get(authUser, InterviewController.getInterviewReportById);

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter
  .route("/")
  .get(authUser, InterviewController.getAllInterviewReports);

/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter
  .route("/resume/pdf/:interviewReportId")
  .post(authUser, InterviewController.generateResumePdf);

export default interviewRouter;
