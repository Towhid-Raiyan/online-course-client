const isInstructor = (user) => {
    if (user?.role === "Instructor") return true;
    else false;
};
const isLearner = (user) => {
    if (user?.role === "Learner") return true;
    else false;
};

export  { isInstructor, isLearner };
