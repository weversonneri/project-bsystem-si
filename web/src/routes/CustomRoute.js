import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CustomRoute = ({ isPrivate, ...rest }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    console.log('object');
  }

  if (isPrivate && !isAuthenticated()) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
};

export default CustomRoute;

// const [permission, setPermission] = useState('');

//   useEffect(() => {
//     async function getScope() {
//       const { data } = await api.get('/api/users/scope').catch((error) => {
//         if (error.response) {
//           console.log(error.response.data);
//         } else {
//           console.log('Error', error.message);
//         }
//         return error;
//       });

//       setPermission(data.message);

//       console.log(data.message);
//     }

//     getScope();
//   }, []);

//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated()) {
//     return <Redirect to="/" />;
//   }

//   if (!scope && isAuthenticated()) {
//     return <Route {...rest} />;
//   }

//   return permission ? <Route {...rest} /> : <Redirect to="/" />;
