import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import * as admin from "firebase-admin";
import * as logClient from "./logClient";
import questionClient, {QuestionLevelEnum} from "./questionClient";
import {ColdLeadAttempt, SanityVerificationQuestion} from "../../src/utils/Types";
import {UpdateLeadRequest} from "../../src/components/verification-questions-cold-lead/leadClient";
import cmsClient from "./cmsClient";

const app = express();


app.use(cors());

admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
});

// Custom logger to keep log messages together in one json
const Logger = function(req: any, res: any, next: any) {
  logClient.createLogger(req, res, next);
  next();
};

app.use(Logger);

app.post("/grade-question/:level",
    async (req: any, functionRes: any) => {
      const gradeQuestionReq: { leadId: string, questionId: string, userResponse: string } = req.body;
      const {level}: { level: any } = req.params;

      const LOG_COMPONENT = "grade-question";

      logClient.log(LOG_COMPONENT, "NOTICE",
          "Request to grade a question", {gradeQuestionReq, level});


      const {
        isCorrectAnswerVerified,
        verificationQuestion,
      }: { isCorrectAnswerVerified: boolean, verificationQuestion: SanityVerificationQuestion } = await questionClient.verifyResponse(gradeQuestionReq.questionId, gradeQuestionReq.userResponse, level);

      let keyValue;
      switch (parseInt(level ?? "")) {
        case QuestionLevelEnum.EASY:
          keyValue = "easyAttempt";
          break;
        case QuestionLevelEnum.HARD:
          keyValue = "hardAttempt";
          break;
        case QuestionLevelEnum.MEDIUM:
          keyValue = "mediumAttempt";
          break;
        default:
          keyValue = "easyAttempt";
          break;
      }

      const attempt: { [key in string]: ColdLeadAttempt } = {
        [keyValue]: {
          isVerified: isCorrectAnswerVerified,
          response: gradeQuestionReq.userResponse ?? "noResponseRecorded",
          questionId: verificationQuestion?._id ?? "",
          questionSlug: verificationQuestion?.slug?.current ?? "",
          questionRef: cmsClient.utils.getSanityDocumentRef(verificationQuestion?._id ?? ""),
        },
      };

      const updateLeadRequest: UpdateLeadRequest = {
        _id: gradeQuestionReq.leadId,
        ...attempt,
      };

      return cmsClient.updateLead(updateLeadRequest).then((result: UpdateLeadRequest) => {
        functionRes.send({result, level});
      });

      // update lead with isVerified

    // functionRes.send({status: "404", message: "Error in uploading converted file"});
    });


exports.app = functions.https.onRequest(app);

