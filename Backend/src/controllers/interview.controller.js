import { PDFParse } from "pdf-parse";
import { InterviewService } from "#service";
import { ResponseHandler, generateResumePdf } from "#utils";

class InterviewController {
  /**
   * @description Controller to generate interview report based on user self description, resume and job description.
   */
  static async generateInterviewReport(req, res) {
    try {
      // console.log("request:", req);
      const userId = req.user._id;
      console.log("userId: ", userId);
      const resumeContent = await new PDFParse(
        Uint8Array.from(req.file.buffer),
      ).getText();

      const { selfDescription, jobDescription } = req.body;

      const interviewReport = await InterviewService.generateInterviewReport(
        resumeContent,
        selfDescription,
        jobDescription,
        userId,
      );

      ResponseHandler.createHandler(
        res,
        interviewReport,
        "Interview report generated successfully",
      );
    } catch (error) {
      ResponseHandler.errorHandler(res, error);
    }
  }

  /**
   * @description Controller to get interview report by interviewId.
   */
  static async getInterviewReportById(req, res) {
    try {
      const { interviewId } = req.params;
      const userId = req.user._id;

      const interviewReport = await InterviewService.getInterviewReportById(
        interviewId,
        userId,
      );

      ResponseHandler.successHandler(
        res,
        interviewReport,
        "Interview report fetched successfully",
      );
    } catch (error) {
      ResponseHandler.errorHandler(res, error);
    }
  }

  /**
   * @description Controller to get all interview reports of logged in user.
   */
  static async getAllInterviewReports(req, res) {
    try {
      const userId = req.user._id;

      const allInterviewReports =
        await InterviewService.getAllInterviewReports(userId);

      ResponseHandler.successHandler(
        res,
        allInterviewReports,
        "Interview reports fetched successfully.",
      );
    } catch (error) {
      ResponseHandler.errorHandler(res, error);
    }
  }

  /**
   * @description Controller to generate resume PDF based on user self description, resume and job description.
   */
  static async generateResumePdf(req, res) {
    const { interviewReportId } = req.params;

    const interviewReport =
      await InterviewService.generateResumePdf(interviewReportId);

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
      resume,
      jobDescription,
      selfDescription,
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
    });

    res.send(pdfBuffer);
  }
}

export default InterviewController;
