import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage.tsx";
import {Signup} from "./pages/SignUp.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Provider} from "react-redux";
import {store} from "./store/Store.ts";

export function App() {
    const routes = createBrowserRouter([
        {
            path: '',
            element : <LoginPage/>,
            children : [
                { path : '/signup', element : <Signup/>},
                { path : '/dashboard', element : <Dashboard name={""} />}

            ]
        },
    ])

    return (
        <>
            <Provider store={store}>
                <RouterProvider router={routes} />
            </Provider>
        </>
    );
}