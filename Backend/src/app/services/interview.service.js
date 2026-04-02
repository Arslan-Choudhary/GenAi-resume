import { InterviewRepository } from "#repository";
import { generateInterviewReport, normalizeInterviewReport } from "#utils";

class InterviewService {
  static async generateInterviewReport(
    resumeContent,
    selfDescription,
    jobDescription,
    userId,
  ) {
    const interViewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    console.log("interViewReportByAi: ", interViewReportByAi);

    const normalizedReport = normalizeInterviewReport(interViewReportByAi);

    console.log("NORMALIZED 👉", normalizedReport);

    const interviewReport = await InterviewRepository.CreateReport({
      user: userId,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...normalizedReport,
    });

    return interviewReport;
  }

  static async getInterviewReportById(interviewId, userId) {
    const interviewReport = await InterviewRepository.GetReport(
      interviewId,
      userId,
    );

    if (!interviewReport) {
      const error = "Interview report not found";
      error.status = 404;
      throw error;
    }

    return interviewReport;
  }

  static async getAllInterviewReports(userId) {
    const allInterviewReports =
      await InterviewRepository.GetAllInterviewReports(userId);

    if (!allInterviewReports) {
      const error = "Interview reports not found";
      error.status = 404;
      throw error;
    }

    return allInterviewReports;
  }
}

export default InterviewService;
