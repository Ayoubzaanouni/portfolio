// Public page paths, shared by nav links and anywhere that needs to build a
// link. The admin dashboard has its own internal sub-routing (react-router,
// mounted client:only) and doesn't use this.
export const routes = {
  Home: '/',
  About: '/about',
  Projects: '/projects',
  Project: '/project',
  Experiences: '/experiences',
  Resume: '/resume',
  Admin: '/admin',
};
