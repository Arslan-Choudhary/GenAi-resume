import { interviewReportModel } from "#models";

class InterviewRepository {
  static async CreateReport(data) {
    return await interviewReportModel.create(data);
  }

  static async GetReport(interviewId, userId) {
    return await interviewReportModel.findOne({
      _id: interviewId,
      user: userId,
    });
  }

  static async GetAllInterviewReports(userId) {
    return await interviewReportModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
      );
  }

  static async GenerateResumePdf(interviewReportId) {
    return await interviewReportModel.findById(interviewReportId);
  }
}

export default InterviewRepository;
