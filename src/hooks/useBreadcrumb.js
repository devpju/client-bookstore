import { addBreadcrumb } from '@/redux/slices/breadcrumbSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

const useBreadcrumb = (label) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (label) {
      dispatch(
        addBreadcrumb({
          path: pathname,
          label
        })
      );
    }
  }, [dispatch, pathname, label]);
};

export default useBreadcrumb;
