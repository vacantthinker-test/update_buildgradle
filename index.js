const path = require('path')
const fs = require('fs')

// 目标文件名
// 目标路径 所有Android项目 存放的文件夹
const root_path = path.dirname(__dirname)

const content_build_gradle = `
        mavenLocal()
        maven {url 'https://maven.aliyun.com/repository/central'}
        maven {url 'https://maven.aliyun.com/repository/public/'}
        maven {url 'https://maven.aliyun.com/repository/google'}
        maven {url 'https://maven.aliyun.com/repository/gradle-plugin'}
        maven {url 'https://maven.aliyun.com/repository/spring'}
        maven {url 'https://maven.aliyun.com/repository/spring-plugin'}
        maven {url 'https://maven.aliyun.com/repository/grails-core'}
        maven {url 'https://maven.aliyun.com/repository/apache-snapshots'}
`

function updateContent(build_file_path) {
	let oldContent = fs.readFileSync(build_file_path, 'utf8');
	let result = oldContent.replace('mavenLocal()', '')
	result = result.replace('google()', '')
	result = result.replace('mavenCentral()', content_build_gradle)
	fs.writeFileSync(build_file_path, Buffer.from(result))
	
}
const filename = 'build.gradle'
function extracted_build_gradle(item_folder) {
	let build_gradle_file_path = path.join(root_path, item_folder, filename)// 获取 目标文件 所在路径
	
	// 访问build.gradle
	fs.access(build_gradle_file_path, err => {
		if (err) {
			// console.log('build.gradle文件不存在, 什么都不做 ...')
			// 查看android文件夹存在么? 查看.flowconfig文件存在么?
			let flowconfig_file_path = path.join(root_path, item_folder, '.flowconfig')
			let android_dir_path = path.join(root_path, item_folder, 'android')
			fs.readdir(android_dir_path, err => { // android文件夹存在, react native项目文件夹
				if (err){
					// console.log('android 不存在 ...')
				}else {
					let reactnative_build_gradle_file_path = path.join(android_dir_path, filename)
					updateContent(reactnative_build_gradle_file_path)
				}
			})
		} else { // 原生Android项目文件夹
			updateContent(build_gradle_file_path)
		}
	})
}

// 同步方式读取目标路径
fs.readdirSync(root_path).forEach(item_folder => {
	extracted_build_gradle(item_folder);
	
})
