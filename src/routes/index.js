// AuthLayout
import Auth from "../pages/Auth/Auth"

// LandingLayout
import Home from "../pages/Home/Home"

// DashboardLayout
import EnglishCourse from "../pages/Courses/EnglishCourse/EnglishCourse";
import DashBoard from "../pages/Courses/DashBoard"

const landingRoutes = {
    path: "/",
    name: "landing",
    badgeColor: "secondary",
    badgeText: "12/24",
    component: Home
};

const dashBoardRoutes = {
    path: "/",
    name: "dashBoard",
    badgeColor: "secondary",
    badgeText: "12/24",
    children: [
        {
            path: "/dashboard",
            name: "Sign In",
            component: DashBoard,
        },        
    ]
};

const quizRoutes = {
    path: "/",
    name: "dashBoard",
    badgeColor: "secondary",
    badgeText: "12/24",
    children: [
        {
            path: "/courses",
            name: "Sign In",
            component: EnglishCourse,
        },
        
    ]
};

const authRoutes = {
    path: "/",
    name: "AuthLayout",
    children: [
        {
            path: "/auth/auth",
            name: "Auth",
            component: Auth,
        }
    ]
};

export const auth = [authRoutes];
export const landing = [landingRoutes];
export const dashboard = [dashBoardRoutes];
export const quiz = [quizRoutes];
// AuthLayout specific routes
