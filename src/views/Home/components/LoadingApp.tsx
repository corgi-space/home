function LoadingApp() {
	return (
		<div className="appItem-icon bg-theme flex flex-col items-center justify-evenly">
			<img
				src="/logo.png"
				alt=""
				className="max mb-2 max-h-[50%] max-w-[50%] object-cover"
			/>
			<div className="loading"></div>
		</div>
	)
}

export default LoadingApp
