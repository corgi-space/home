function LoadingApp() {
	return (
		<div className="appItem-icon bg-theme flex flex-col items-center justify-evenly">
			<img src="/logo.png" alt="" className="mb-2 w-1/2 object-cover" />
			<div className="loading"></div>
		</div>
	)
}

export default LoadingApp
