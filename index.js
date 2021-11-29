const path = require('path')
const fs = require('fs')

// 目标文件名
// 目标路径 所有Android项目 存放的文件夹
const root_path = path.dirname(__dirname)

const content_mirror = `
        mavenLocal()
        maven {url 'https://maven.aliyun.com/repository/central'}
        maven {url 'https://maven.aliyun.com/repository/public/'}
        maven {url 'https://maven.aliyun.com/repository/google'}
        maven {url 'https://maven.aliyun.com/repository/gradle-plugin'}
        maven {url 'https://maven.aliyun.com/repository/spring'}
        maven {url 'https://maven.aliyun.com/repository/spring-plugin'}
        maven {url 'https://maven.aliyun.com/repository/grails-core'}
        maven {url 'https://maven.aliyun.com/repository/apache-snapshots'}
        mavenCentral()
`

let search_value1 = 'mavenLocal()'
let search_value2 = 'google()';
let search_value3 = 'mavenCentral()';
let replace_value1 = '';
let unicode = 'utf8';
function updateContent(target_path) {
	let oldContent = fs.readFileSync(target_path, unicode);
	let result = oldContent.replaceAll(search_value1, replace_value1)
	result = result.replaceAll(search_value2, replace_value1)
	result = result.replaceAll(search_value3, content_mirror)
	fs.writeFileSync(target_path, Buffer.from(result))
	
}

const build_gradle = "build.gradle"
const settings_gradle = "settings.gradle"

function update_file(item_folder) {
	let build_gradle_file_path = path.join(root_path, item_folder, build_gradle)// 获取 目标文件 所在路径
	let settings_gradle_file_path = path.join(root_path, item_folder, settings_gradle)

	// 访问build.gradle settings.gradle
	if (fs.existsSync(build_gradle_file_path)) {
		updateContent(build_gradle_file_path)
		updateContent(settings_gradle_file_path)
		
	} else {
		// 查看android文件夹存在么? 查看.flowconfig文件存在么?
		let flowconfig_file_path = path.join(root_path, item_folder, '.flowconfig')
		let android_dir_path = path.join(root_path, item_folder, 'android')
		if (fs.existsSync(android_dir_path) && fs.existsSync(flowconfig_file_path)) {
			// android文件夹存在, react native项目文件夹
			console.log('android文件夹存在 正在更新build.gradle文件中...')
			let reactnative_build_gradle_file_path = path.join(android_dir_path, build_gradle)
			updateContent(reactnative_build_gradle_file_path)
			updateContent(settings_gradle_file_path)
			
		}
	}
}

// 同步方式读取目标路径
fs.readdirSync(root_path).forEach(item_folder => {
	update_file(item_folder);
})
