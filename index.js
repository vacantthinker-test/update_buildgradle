const path = require('path')
const fs = require('fs')

// 目标文件名
// 目标路径 所有Android项目 存放的文件夹
const root_path = path.dirname(__dirname)

const content_build_gradle = `
    repositories {
        mavenLocal()
        maven {url 'https://maven.aliyun.com/repository/central'}
        maven {url 'https://maven.aliyun.com/repository/public/'}
        maven {url 'https://maven.aliyun.com/repository/google'}
        maven {url 'https://maven.aliyun.com/repository/gradle-plugin'}
        maven {url 'https://maven.aliyun.com/repository/spring'}
        maven {url 'https://maven.aliyun.com/repository/spring-plugin'}
        maven {url 'https://maven.aliyun.com/repository/grails-core'}
        maven {url 'https://maven.aliyun.com/repository/apache-snapshots'}
    }
`

function extracted_build_gradle(item_folder) {
	// target_build_gradle_filename
	// --------------------------------------------------------------------------
	// 访问一下文件, 如果出错则catch块执行, 如果没错那么执行下面的代码
	const target_build_gradle_filename = 'build.gradle'
	let build_gradle_file_path = path.join(root_path, item_folder, target_build_gradle_filename)// 获取 目标文件 所在路径
	fs.access(build_gradle_file_path, err => {
		if (err) {
			// console.log('文件不存在, 什么都不做 ...')
		} else {
			let oldContent = fs.readFileSync(build_gradle_file_path, 'utf8');
			let regex = /repositories[\s]*\{[\s]*([^\}]*)\}/g
			if (regex.test(oldContent)) {
				// let secondContent = oldContent.match(regex);
				// console.log(secondContent);
				
				let target = oldContent.match(regex)[0];
				if (target.indexOf('https://maven.aliyun.com') === -1) {
					let result = oldContent.replaceAll(regex, content_build_gradle);
					let build_gradle_buffer = Buffer.from(result)
					fs.writeFileSync(build_gradle_file_path, build_gradle_buffer)
					console.log(`${item_folder} ${target_build_gradle_filename} 更新完成 ...`)
					// --------------------------------------------------------------------------
				} else {
					console.log(`${item_folder} 已经修改过了 ... `)
				}
				
			}
			
		}
	})
}

function extracted_gradle_wrapper(item_folder) {
	// target_gradle_wrapper_properties_filename
	// --------------------------------------------------------------------------
	const target_gradle_wrapper_properties_filename = 'gradle-wrapper.properties'
	let gradle_wrapper_properties_file_path = path.join(root_path, item_folder, 'gradle', 'wrapper', target_gradle_wrapper_properties_filename)// 获取 目标文件 所在路径
	fs.accessSync(gradle_wrapper_properties_file_path)
	let gradle_wrapper_properties_content_path = path.join(__dirname, 'content_gradle-wrapper.properties');
	let gradle_wrapper_properties_buffer = fs.readFileSync(gradle_wrapper_properties_content_path)
	fs.writeFileSync(gradle_wrapper_properties_file_path, gradle_wrapper_properties_buffer)
	console.log(`${item_folder} ${target_gradle_wrapper_properties_filename} done`)
	
	// --------------------------------------------------------------------------
}

function extracted_settings_gradle(item_folder) {
	// --------------------------------------------------------------------------
	const target_settings_gradle = 'settings.gradle'
	let settings_gradle_file_path = path.join(root_path, item_folder, target_settings_gradle)
	fs.accessSync(settings_gradle_file_path)
	let source_settings_gradle = fs.readFileSync(settings_gradle_file_path).toString('utf8');
	let regExp = /dependencyResolutionManagement/
	console.log(settings_gradle_file_path)
	console.log(regExp.test(source_settings_gradle))
	console.log('')
	// --------------------------------------------------------------------------
}

// 同步方式读取目标路径
fs.readdirSync(root_path).forEach(item_folder => {
	extracted_build_gradle(item_folder);
	// extracted_gradle_wrapper(item_folder);
	// extracted_settings_gradle(item_folder)
	
})
