const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1/'
let times = 0
export default function getRequest(options){
	times++
	wx.showLoading({
		title:"loading",
		mask: true,
	});
	return new Promise((resolve, reject)=>{
		wx.request({
			url:baseUrl + options.url,
			method:options.method || 'GET',
			data:options.data||{},
			success: (res)=>{
				resolve(res)
			},
			fail: (err)=>{
				reject(err)
			},
			complete:()=>{
				times--
			  wx.hideLoading();
			}
		})
	})
}