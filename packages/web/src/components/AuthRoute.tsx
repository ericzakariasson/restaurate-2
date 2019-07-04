import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { routes } from '../routes';
import { useMeQuery } from '../graphql/types';
import { GeneralError } from '../scenes';

interface AuthRouteProps extends RouteProps {
  fallbackRoute?: string;
}

export const AuthRoute = ({
  fallbackRoute = routes.login,
  ...props
}: AuthRouteProps) => {
  const { data, loading, error } = useMeQuery();

  if (loading || !data) {
    return null;
  }

  if (error) {
    return <GeneralError />;
  }

  if (!data.me) {
    return <Redirect to={fallbackRoute} />;
  }

  return <Route {...props} />;
};
