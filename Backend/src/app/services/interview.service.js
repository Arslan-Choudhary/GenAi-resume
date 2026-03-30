import { InterviewRepository } from "#repository";
import { generateInterviewReport } from "#utils";

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

    const interviewReport = await InterviewRepository.CreateReport({
      user: userId,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interViewReportByAi,
    });

    return interviewReport;
  }
}

export default InterviewService;
