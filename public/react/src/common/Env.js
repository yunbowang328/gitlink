export function isDev() {
	return window.location.port === "3007";
}

// const isMobile
export const isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

// const isWeiXin = (/MicroMessenger/i.test(navigator.userAgent.toLowerCase()));
