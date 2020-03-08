import Loadable from 'react-loadable';

import Loading from "./Loading";

const CustomLoadable = (loader, loading = Loading) => {
  return Loadable({
    loader,
    loading
  })
}

export default CustomLoadable