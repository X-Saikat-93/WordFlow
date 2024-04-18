import { redirect } from "next/navigation";
import { getLesson, getUserProgress } from "../../../db/quaries";
import Quiz from "./quiz";
const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();
  // const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
    // userSubscriptionData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
    
    />
  );
};

export default LessonPage;