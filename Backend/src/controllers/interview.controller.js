import { PDFParse } from "pdf-parse";
import { InterviewService } from "#service";
import { ResponseHandler } from "#utils";

class InterviewController {
  static async generateInterviewReport(req, res) {
    const userId = req.user.id;
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
  }
}

export default InterviewController;
