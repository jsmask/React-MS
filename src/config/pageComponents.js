import Loadable from 'react-loadable';
import PageSpin from '@components/pageSpin';

export const Login = Loadable({
    loader: () => import('@pages/login/login'),
    loading: PageSpin
})

export const Admin = Loadable({
    loader: () => import('@pages/admin/admin'),
    loading: PageSpin
})

export const Error = Loadable({
    loader: () => import('@pages/error/error'),
    loading: PageSpin
})


export const Home = Loadable({
    loader: () => import('@pages/home/home'),
    loading: PageSpin
})
export const Income = Loadable({
    loader: () => import('@pages/income/income'),
    loading: PageSpin
})
export const Bar = Loadable({
    loader: () => import('@pages/charts/bar'),
    loading: PageSpin
})
export const Line = Loadable({
    loader: () => import('@pages/charts/line'),
    loading: PageSpin
})
export const Pie = Loadable({
    loader: () => import('@pages/charts/pie'),
    loading: PageSpin
})
export const User = Loadable({
    loader: () => import('@pages/data/user'),
    loading: PageSpin
})
export const Role = Loadable({
    loader: () => import('@pages/data/role'),
    loading: PageSpin
})

export const Prop = Loadable({
    loader: () => import('@pages/form/prop'),
    loading: PageSpin
})

export const Model = Loadable({
    loader: () => import('@pages/form/model'),
    loading: PageSpin
})