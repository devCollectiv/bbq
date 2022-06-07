import * as logClient from "./logClient";
import cmsClient from "./cmsClient";

export enum QuestionLevelEnum {
  EASY,
  MEDIUM,
  HARD
}

const verifyResponse = async (questionId:string, response: string, level: QuestionLevelEnum) => {
  const LOG_COMPONENT = "verify-response";

  logClient.log(LOG_COMPONENT, "NOTICE",
      "Verifying Response", {questionId, response});

  // get the question
  const verificationQuestion = await cmsClient.fetchVerificationQuestion(questionId);

  const isCorrectAnswerVerified =(verificationQuestion.correctAnswer === response);

  return {isCorrectAnswerVerified, verificationQuestion};
};

export default {verifyResponse};
