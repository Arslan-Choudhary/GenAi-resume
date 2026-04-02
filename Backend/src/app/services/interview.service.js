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
}

export default InterviewService;
