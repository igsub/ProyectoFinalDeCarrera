import { BrowserRouter } from "react-router-dom"
import AnimatedRoutes from "./AnimatedRoutes"
import Layout from "./Components/Layout/Layout"

const Routes = () => {
	return (
		<BrowserRouter>
			<Layout>
				<AnimatedRoutes />
			</Layout>
		</BrowserRouter>
	)
}

export default Routes
