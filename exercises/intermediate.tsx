export interface Exercise {
  exerciseName: string;
  link: string;
}

export interface DayExercises {
  [key: number]: Exercise;
}

export interface WorkoutPlan {
  title: string;
  [key: number]: DayExercises;
}

export const intermediate: WorkoutPlan = {
  title: "intermediate",
  //H-Push Lower Push
  1: {
    1: {
      exerciseName: "Push-Up",
      link: "https://www.youtube.com/watch?v=IODxDxX7oi4&ab_channel=Calisthenicmovement",
    },
    2: {
      exerciseName: "Air Squat",
      link: "https://www.youtube.com/watch?v=NGttLyYktTw&ab_channel=cultfitOfficial",
    },
    3: {
      exerciseName: "Shoulder Stretch",
      link: "https://www.youtube.com/watch?v=bN6v5HcHIEw&ab_channel=LIVESTRONG.COM",
    },
  },
  //V-Pull Lower Pull
  2: {
    1: {
      exerciseName: "Scap Pull Up",
      link: "https://www.youtube.com/watch?v=XFhawbWS9uc&t=5s",
    },
    2: {
      exerciseName: "1 Leg Bridge",
      link: "https://www.youtube.com/watch?v=3NXv0Nany-Q",
    },
    3: {
      exerciseName: "Prying Squat",
      link: "https://www.youtube.com/watch?v=QSJKFkOu59g&ab_channel=PowerCompanyClimbing",
    },
  },
  //Skills and Abs
  3: {
    1: {
      exerciseName: "Wall Plank",
      link: "https://www.youtube.com/watch?v=6jm4R3K4sJA",
    },
    2: {
      exerciseName: "1 Foot Supported L-Sit",
      link: "https://www.youtube.com/watch?v=VpobvFPR6hQ&t=7m18s",
    },
    3: {
      exerciseName: "Hip Flexor Stretch",
      link: "https://www.youtube.com/watch?v=7bRaX6M2nr8&ab_channel=AskDoctorJo",
    },
  },
  //V-Push Lower Push
  4: {
    1: {
      exerciseName: "Chair Dip (Straight Leg)",
      link: "https://www.youtube.com/watch?v=u5HbUxh40Y4&ab_channel=BodyFlyFitness",
    },
    2: {
      exerciseName: "Lunge",
      link: "https://www.youtube.com/watch?v=qeJ3Si5r5y0&ab_channel=GirlsGoneStrongz  ",
    },
    3: {
      exerciseName: "Butterfly Stretch",
      link: "https://www.youtube.com/watch?v=MdE_Cj6ChLo&ab_channel=COREChiropractic",
    },
  },
  //H-Pull Lower Pull
  5: {
    1: {
      exerciseName: "Bodyweight Row",
      link: "https://www.youtube.com/watch?v=rloXYB8M3vU&ab_channel=AntranikDotOrg",
    },
    2: {
      exerciseName: "Negative Nordic",
      link: "https://www.youtube.com/watch?v=RCEVP6Y8yI0",
    },
    3: {
      exerciseName: "Lying Pigeon",
      link: "https://www.youtube.com/watch?v=op-eDU9eNqM&ab_channel=AskDoctorJo",
    },
  },
};
