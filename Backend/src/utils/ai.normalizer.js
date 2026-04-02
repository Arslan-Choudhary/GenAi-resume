function convertToObjects(arr, keys) {
  if (!Array.isArray(arr)) return [];

  // If already correct → return as-is
  if (typeof arr[0] === "object") return arr;

  const result = [];

  for (let i = 0; i < arr.length; i += keys.length * 2) {
    const obj = {};

    for (let j = 0; j < keys.length; j++) {
      const keyIndex = i + j * 2;
      const valueIndex = keyIndex + 1;

      if (arr[keyIndex] === keys[j]) {
        obj[keys[j]] = arr[valueIndex];
      }
    }

    result.push(obj);
  }

  return result;
}

function normalizeInterviewReport(report) {
  if (!report) return report;

  // Technical questions
  report.technicalQuestions = (report.technicalQuestions || []).map(
    (q, idx) => ({
      question: q,
      intention:
        "Provide a detailed answer covering key concepts and best practices.", // fallback intention
      answer:
        "Answer should include core concepts, examples, and practical implementation details.", // fallback answer
    }),
  );

  // Behavioral questions
  report.behavioralQuestions = (report.behavioralQuestions || []).map(
    (q, idx) => ({
      question: q,
      intention:
        "Assess candidate's problem-solving, teamwork, and communication skills.",
      answer:
        "Answer should include context, action taken, and outcome (STAR method).",
    }),
  );

  // Skill gaps
  report.skillGaps = (report.skillGaps || []).map((skill) => ({
    skill,
    severity: "medium", // default severity
  }));

  // Preparation plan
  report.preparationPlan = (report.preparationPlan || []).map((plan, idx) => ({
    day: idx + 1,
    focus: plan,
    tasks: [
      "Review relevant concepts and tutorials.",
      "Practice with hands-on exercises.",
      "Apply knowledge in a small project or example.",
    ],
  }));

  return report;
}

export default normalizeInterviewReport;
