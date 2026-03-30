import { interviewReportModel } from "#models";

class InterviewRepository {
  static async CreateReport(data) {
    return await interviewReportModel.create(data);
  }
}

export default InterviewRepository;
