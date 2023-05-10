const Wallpaper = () => {
	return (
		<div className="fixed z-[-1]">
			<div className="absolute h-full w-full bg-black bg-opacity-[var(--wallpaper-opacity)] backdrop-blur-[var(--wallpaper-blur)]"></div>
			<img src="https://cn.bing.com//th?id=OHR.CordouanLighthouse_ZH-CN6267155218_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"></img>
		</div>
	)
}

export default Wallpaper
