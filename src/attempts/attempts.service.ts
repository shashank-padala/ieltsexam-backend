import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Module, ExamType } from '@prisma/client';
import OpenAI from 'openai';  // ✅ Correct OpenAI Import

@Injectable()
export class AttemptsService {
  private openai: OpenAI;

  constructor(private prisma: PrismaService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // ✅ Start a new attempt
  async startAttempt(userId: string, examId: string, module: Module) {
    return this.prisma.attempt.create({
      data: {
        userId,
        examId,
        module,
        responses: {},
        score: null,
        completedAt: null,
      },
    });
  }

  // ✅ Get user attempts
  async getUserAttempts(userId: string) {
    return this.prisma.attempt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ✅ Modular Evaluation based on Module
  async submitAttempt(attemptId: string, responses: any) {
    const attempt = await this.getAttemptWithQuestions(attemptId);
    if (!attempt) throw new Error('Attempt not found');

    switch (attempt.module) {
      case Module.Listening:
        return this.evaluateListeningOrReading(attemptId, responses, Module.Listening, attempt.exam.type);

      case Module.Reading:
        return this.evaluateListeningOrReading(attemptId, responses, Module.Reading, attempt.exam.type);

      case Module.Writing:
        return this.evaluateWritingAttempt(attemptId, responses);

      case Module.Speaking:
        return this.evaluateSpeakingAttempt(attemptId, responses);

      default:
        throw new Error('Invalid module type');
    }
  }

  // ✅ Listening & Reading Evaluation (Same Logic)
  private async evaluateListeningOrReading(attemptId: string, responses: any, module: Module, examType: ExamType) {
    const attempt = await this.getAttemptWithQuestions(attemptId);
    if (!attempt) throw new Error('Attempt not found');

    const { correctCount, detailedFeedback } = this.evaluateResponses(
      attempt.exam.questions,
      responses
    );

    const bandScore = module === Module.Listening
      ? this.convertListeningScore(correctCount)
      : this.convertReadingScore(correctCount, examType);

    return this.updateAttempt(attemptId, detailedFeedback, bandScore);
  }

  // ✅ Writing Evaluation using AI (Includes Rephrased Answer)
  private async evaluateWritingAttempt(attemptId: string, responses: any) {
    const writingTask1 = responses.task1 || '';
    const writingTask2 = responses.task2 || '';

    const prompt = `
      You are an IELTS examiner. Evaluate the following writing tasks based on IELTS criteria (Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy).
      
      **Task 1 Response:** ${writingTask1}
      **Task 2 Response:** ${writingTask2}
      
      Provide:
      - A band score (0-9) for each category.
      - A short feedback summary explaining the strengths and weaknesses.
      - A rephrased version of the responses to improve the band score.
      
      Format your response as JSON:
      {
        "task1": {
          "TA": 7.0,
          "CC": 6.5,
          "LR": 7.0,
          "GRA": 6.5,
          "feedback": "Your response is well-structured, but grammatical errors reduce clarity.",
          "improved_response": "An enhanced version of the response that fixes grammar and improves clarity."
        },
        "task2": {
          "TA": 7.5,
          "CC": 7.0,
          "LR": 7.5,
          "GRA": 7.0,
          "feedback": "Good argumentation and vocabulary, but some coherence issues.",
          "improved_response": "A reworded answer that enhances coherence and vocabulary."
        }
      }
    `;

    const aiResponse = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }, 
    });

    // ✅ Parse JSON response correctly
    const rawEvaluation = aiResponse.choices[0].message.content;

    if (!rawEvaluation) {
      throw new Error('AI response was null, unable to evaluate writing.');
    }

    const evaluation = JSON.parse(rawEvaluation);

    // ✅ Compute Final Band Score
    const avgBandScore =
      (evaluation.task1.TA + evaluation.task1.CC + evaluation.task1.LR + evaluation.task1.GRA +
        evaluation.task2.TA + evaluation.task2.CC + evaluation.task2.LR + evaluation.task2.GRA) /
      8;

    return this.updateAttempt(attemptId, evaluation, avgBandScore);
  }

  // ✅ Placeholder for Speaking Evaluation (To be implemented later)
  private async evaluateSpeakingAttempt(attemptId: string, responses: any) {
    return {
      message: 'Speaking evaluation will be implemented separately using voice analysis.',
    };
  }

  // ✅ Fetch Attempt with Exam & Questions
  private async getAttemptWithQuestions(attemptId: string) {
    return this.prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        exam: {
          include: { questions: true },
        },
      },
    });
  }

  // ✅ Evaluate Responses & Track Correct Answers
  private evaluateResponses(questions, responses) {
    let correctCount = 0;
    let detailedFeedback: {
      questionId: string;
      question: string;
      userAnswer: string | null;
      correctAnswer: string;
      isCorrect: boolean;
    }[] = []; 

    questions.forEach((question) => {
      const userAnswer = responses[question.id] || null;
      const isCorrect = userAnswer === question.correct_answer;

      detailedFeedback.push({
        questionId: question.id,
        question: question.content.question,
        userAnswer,
        correctAnswer: question.correct_answer,
        isCorrect,
      });

      if (isCorrect) correctCount++;
    });

    return { correctCount, detailedFeedback };
  }

  // ✅ Convert Listening Score to Band Score
  private convertListeningScore(rawScore: number): number {
    const bandTable = [1, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
    return bandTable[Math.min(rawScore, 40) / 2] || 1;
  }

  // ✅ Convert Reading Score to Band Score
  private convertReadingScore(rawScore: number, examType: ExamType): number {
    const bandTableAcademic = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
    const bandTableGeneral = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];

    return examType === ExamType.General
      ? bandTableGeneral[Math.min(rawScore, 40) / 2] || 1
      : bandTableAcademic[Math.min(rawScore, 40) / 2] || 1;
  }

  // ✅ Update Attempt with Score & Feedback
  private async updateAttempt(attemptId: string, detailedFeedback: any, bandScore: number) {
    return this.prisma.attempt.update({
      where: { id: attemptId },
      data: {
        responses: detailedFeedback,
        score: bandScore,
        completedAt: new Date(),
      },
    });
  }
}
