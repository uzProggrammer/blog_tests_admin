import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const AllTests = React.lazy(() => import('./views/tests/all.jsx'))
const TestView = React.lazy(() => import('./views/tests/test.jsx'))
const CreateTest = React.lazy(() => import('./views/tests/create.jsx'))
const Results = React.lazy(() => import('./views/tests/results.jsx'))
const Result = React.lazy(() => import('./views/tests/result.jsx'))


const Users = React.lazy(() => import('./views/users/all.jsx'))
const Profile = React.lazy(() => import('./views/users/profile.jsx'))

const AllGroups = React.lazy(() => import('./views/groups/all.jsx'))
const Group = React.lazy(() => import('./views/groups/group.jsx'))
const AddStudent = React.lazy(() => import('./views/groups/add-student.jsx'))
const CreateGroup = React.lazy(() => import('./views/groups/create.jsx'))

const AllBlokTests = React.lazy(() => import('./views/blog-tests/all.jsx'))
const BlogTest = React.lazy(() => import('./views/blog-tests/blog-test.jsx'))
const BlogResults = React.lazy(() => import('./views/blog-tests/results.jsx'))
const BlogResult = React.lazy(() => import('./views/blog-tests/result.jsx'))
const CreateBlogTest = React.lazy(() => import('./views/blog-tests/create.jsx'))


const FedbacksView = React.lazy(() => import('./views/fedbacks/all.jsx'))
const FeedbackView = React.lazy(() => import('./views/fedbacks/feedback.jsx'))


const MessagesList = React.lazy(() => import('./views/messages/list.jsx'))
const Messenger = React.lazy(() => import('./views/messages/message.jsx'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Statistika', element: Dashboard },
  { path: '/tests', name: 'Testlar', element: AllTests },
  { path: '/tests/add', name: 'Test yaratish', element: CreateTest },
  { path: '/tests/:id/results', name: 'Natijalar', element: Results },
  { path: '/tests/:id/results/:id1', name: 'Natija', element: Result },
  { path: '/tests/:id', name: 'Test', element: TestView },
  
  
  { path: '/users', name: 'Foydalanuvchilar', element: Users },
  { path: '/users/:username', name: 'Profil', element: Profile },
  

  
  { path: '/groups', name: 'Guruhlar', element: AllGroups },
  { path: '/groups/add', name: 'Guruh yaratish', element: CreateGroup },
  { path: '/groups/:id/add-student', name: 'Guruh', element: AddStudent },
  { path: '/groups/:id', name: 'Guruh', element: Group },
  
  { path: '/blog-tests', name: 'Blog testlar', element: AllBlokTests },
  { path: '/blog-tests/add', name: 'Blog test yaratish', element: CreateBlogTest },
  { path: '/blog-tests/:id/results', name: 'Blog test natijalari', element: BlogResults },
  { path: '/blog-tests/:id/results/:id1', name: 'Blog test natijalari', element: BlogResult },
  { path: '/blog-tests/:id', name: 'Blog test', element: BlogTest },

  
  { path: '/feedbacks', name: 'E\'tirozlar', element: FedbacksView },
  { path: '/feedbacks/:id', name: 'E\'tirozlar', element: FeedbackView },

  
  { path: '/messages', name: 'Suhbatlar', element: MessagesList },
  { path: '/messages/:id', name: 'Suhbat', element: Messenger },
]

export default routes
